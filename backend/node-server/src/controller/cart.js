const { formatDistanceToNow } = require('date-fns');

const prisma = require('../../prisma/prisma');
const cartSchema = require('../validation/cart');

const getCartItems = async (request, response) => {
  const userId = parseInt(request.params.id);
  try {
    items = await prisma.cart.findMany({
      where: {
        userId: userId,
        isCheckout: false,
      },
      select: {
        id: true,
        courseId: true,
        craetedAt: true,
        course: {
          select: {
            price: true,
            author: {
              select: {
                fullName: true,
              },
            },
          },
        },
      },
    });

    // for (const item in items) {
    //   console.log('item.craetedAt: ', item.craetedAt);
    //   item.craetedAt = formatDistanceToNow(new Date(item.craetedAt), {
    //     addSuffix: true,
    //   });
    // }
    const cartItems = items.map((cartItem) => {
      let craetedAt = formatDistanceToNow(new Date(cartItem.craetedAt), {
        addSuffix: true,
      });
      return { ...cartItem, craetedAt };
    });
    return response.status(200).json(cartItems);
  } catch (error) {
    return response
      .status(500)
      .json({ message: 'Internal Server Error ' + `${error}` });
  }
};

const addToCart = async (request, response) => {
  const { error, value } = cartSchema.cart.validate({
    ...request.body,
  });

  value;
  // If Joi validation fails, send an error response
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Check if the item already exists in the cart
    const existingItem = await prisma.cart.findFirst({
      where: {
        courseId: value.courseId,
        userId: value.userId,
      },
    });

    if (existingItem) {
      // Item already exists in the cart, return an error message
      return response
        .status(400)
        .json({ message: 'Course already exists in the cart' });
    }

    // Check if the course of his own
    const courseCount = await prisma.course.count({
      where: {
        id: value.courseId,
        authorId: value.userId,
      },
    });

    if (courseCount > 0) {
      // Item user's own course, return an error message
      return response.status(400).json({
        message: "Instructor can't purchase their own course",
      });
    }

    // Item doesn't exist in the cart, proceed to add it
    await prisma.cart.create({
      data: value,
    });
    return response.status(200).json({ message: 'Added to Cart' });
  } catch (error) {
    return response
      .status(500)
      .json({ message: `Internal Server Error ${error}` });
  }
};

const deletCartItems = async (request, response) => {
  const id = parseInt(request.params.id);
  try {
    await prisma.cart.delete({
      where: {
        id: id,
      },
    });
    return response.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getCartItems, addToCart, deletCartItems };
