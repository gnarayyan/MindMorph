import 'package:flutter/material.dart';
import 'package:morph/const/color.dart';

class User {
  final String studentname;
  final String turned;
  final String UrlAvatar;
  final String points;

  User({
    required this.UrlAvatar,
    required this.turned,
    required this.studentname,
    required this.points,
  });
}

class Dashboard extends StatefulWidget {
  const Dashboard({Key? key}) : super(key: key);

  @override
  _DashboardState createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  int? selectedCardIndex;
  int? marksInputIndex;
  final TextEditingController _commentController = TextEditingController();
  final TextEditingController _marksController = TextEditingController();

  List<User> user = [
    User(
        UrlAvatar:
            'https://i.pinimg.com/736x/cf/0b/74/cf0b7475f26c043b55fe50cfb98c15d5.jpg',
        turned: '2020/3/3',
        studentname: 'Suraj Yadav',
        points: '10'),
    User(
        UrlAvatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQgWejE2_K0DKRYUP09A1nuMu6CuIs3oULFak4QA4YLA&',
        turned: '2020/3/3',
        studentname: 'Narayan Gautam',
        points: '8'),
    User(
        UrlAvatar:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Neil_deGrasse_Tyson_in_June_2017_%28cropped%29.jpg/1200px-Neil_deGrasse_Tyson_in_June_2017_%28cropped%29.jpg',
        turned: '2020/5/5',
        studentname: 'Sobin Rai',
        points: '9'),
    User(
        UrlAvatar:
            'https://i.pinimg.com/736x/cf/0b/74/cf0b7475f26c043b55fe50cfb98c15d5.jpg',
        turned: '2020/3/3',
        studentname: 'Suraj Yadav',
        points: '10'),
    User(
        UrlAvatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQgWejE2_K0DKRYUP09A1nuMu6CuIs3oULFak4QA4YLA&',
        turned: '2020/3/3',
        studentname: 'Narayan Gautam',
        points: '8'),
    User(
        UrlAvatar:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Neil_deGrasse_Tyson_in_June_2017_%28cropped%29.jpg/1200px-Neil_deGrasse_Tyson_in_June_2017_%28cropped%29.jpg',
        turned: '2020/5/5',
        studentname: 'Sobin Rai',
        points: '7'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 80,
        shadowColor: Colors.white,
        foregroundColor: Colors.red,
        backgroundColor: themecolor,
        title: const Text(
          'Students Assignments',
          style: TextStyle(color: titlecolor),
        ),
      ),
      body: Container(
        color: backgrounghilghtcolor,
        child: ListView.builder(
          itemCount: user.length,
          itemBuilder: (context, index) {
            final users = user[index];
            return Card(
              color: boxcolor,
              semanticContainer: true,
              child: Column(
                children: [
                  ListTile(
                    contentPadding: const EdgeInsets.symmetric(
                        horizontal: 20.0, vertical: 20.0),
                    leading: CircleAvatar(
                      radius: 28,
                      backgroundImage: NetworkImage(users.UrlAvatar),
                    ),
                    title: Text(
                      users.studentname,
                      style: TextStyle(color: titlecolor),
                    ),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          users.turned,
                          style: TextStyle(color: Colors.amber),
                        ),
                        GestureDetector(
                          onTap: () {
                            setState(() {
                              marksInputIndex =
                                  marksInputIndex == index ? null : index;
                              selectedCardIndex = null;
                            });
                          },
                          child: Text(
                            '${users.points}/10',
                            style: TextStyle(
                              color: Color.fromARGB(255, 59, 239, 5),
                              decoration: TextDecoration.underline,
                            ),
                          ),
                        ),
                      ],
                    ),
                    trailing: SizedBox(
                      width: 80,
                      child: Wrap(
                        spacing: 8,
                        children: [
                          IconButton(
                            onPressed: () {
                              setState(() {
                                selectedCardIndex =
                                    selectedCardIndex == index ? null : index;
                                marksInputIndex = null;
                              });
                            },
                            icon: const Icon(
                              Icons.comment,
                              color: titlecolor,
                            ),
                          ),
                          IconButton(
                            onPressed: () {},
                            icon: const Icon(
                              Icons.visibility,
                              color: titlecolor,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  if (selectedCardIndex == index)
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16.0),
                      child: TextField(
                        style: TextStyle(color: titlecolor),
                        controller: _commentController,
                        decoration: InputDecoration(
                          labelText: 'Enter your comment',
                          suffixIcon: IconButton(
                            icon: Icon(Icons.send),
                            onPressed: () {
                              _commentController.clear();
                              setState(() {
                                selectedCardIndex = null;
                              });
                            },
                          ),
                        ),
                      ),
                    ),
                  if (marksInputIndex == index)
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16.0),
                      child: TextField(
                        style: TextStyle(color: titlecolor),
                        controller: _marksController,
                        keyboardType: TextInputType.number,
                        decoration: InputDecoration(
                          labelText: 'Enter marks',
                          suffixIcon: IconButton(
                            icon: Icon(Icons.save),
                            onPressed: () {
                              _marksController.clear();
                              setState(() {
                                marksInputIndex = null;
                              });
                            },
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
