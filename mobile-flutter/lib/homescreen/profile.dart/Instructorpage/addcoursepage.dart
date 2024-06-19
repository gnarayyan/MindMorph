import 'package:flutter/material.dart';
import 'package:flutter_keyboard_visibility/flutter_keyboard_visibility.dart';
import 'package:get/get.dart';
import 'package:morph/const/color.dart';
import 'package:morph/const/fonts.dart';
import 'package:morph/homescreen/profile.dart/Instructorpage/Instructorcourselist.dart';
import 'package:morph/homescreen/profile.dart/Instructorpage/addsection.dart';
import 'package:velocity_x/velocity_x.dart';

const List<String> list = <String>[
  'English',
  'Nepali'
]; // languages  ko lagi rakheko ho hai
String dropdownVaule = list.first;

class AddCoursePage extends StatefulWidget {
  const AddCoursePage({Key? key}) : super(key: key);

  @override
  _AddCoursePageState createState() => _AddCoursePageState();
}

class _AddCoursePageState extends State<AddCoursePage> {
  TextEditingController _courseNameController = TextEditingController();
  TextEditingController _priceController = TextEditingController();

  TextEditingController _descriptionController = TextEditingController();
  TextEditingController _RequirementController = TextEditingController();
  TextEditingController _objectController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            backgroundColor: boxtilecolor,
            iconTheme: const IconThemeData(color: titlecolor),
            centerTitle: true,
            title: const Text(
              "Add Course",
              style: TextStyle(color: titlecolor, fontSize: 20),
            )),
        body: KeyboardVisibilityBuilder(
          builder: (context, iskeyboadvisible) {
            return SingleChildScrollView(
              child: Container(
                width: context.screenWidth,
                height: context.screenHeight,
                color: themecolor,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    20.heightBox,
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.all(10),
                        width: MediaQuery.of(context).size.width * 0.90,
                        height: MediaQuery.of(context).size.height * 0.5,
                        decoration: BoxDecoration(
                          color: boxtilecolor,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Expanded(
                          child: Column(
                            children: [
                              5.heightBox,
                              const Text(
                                "Course Details",
                                style: TextStyle(
                                  color: titlecolor,
                                  fontFamily: bold,
                                  fontSize: 16,
                                ),
                              ),
                              const Divider(
                                thickness: 1,
                                color: titlecolor,
                                endIndent: 60,
                                indent: 60,
                              ),
                              TextFormField(
                                controller: _courseNameController,
                                decoration: const InputDecoration(
                                  labelText: 'Title:',
                                  labelStyle: TextStyle(
                                      color: FeatureColor,
                                      fontFamily: semibold),
                                  border: UnderlineInputBorder(),
                                ),
                                style: const TextStyle(
                                    color: Color.fromARGB(255, 137, 165, 204)),
                              ),
                              TextFormField(
                                controller: _priceController,
                                decoration: const InputDecoration(
                                  labelText: 'Price:',
                                  labelStyle: TextStyle(
                                      color: FeatureColor,
                                      fontFamily: semibold),
                                  border: UnderlineInputBorder(),
                                ),
                                style: const TextStyle(
                                    color: Color.fromARGB(255, 137, 165, 204)),
                              ),
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceAround,
                                children: [
                                  const Text(
                                    'Languages:',
                                    style: TextStyle(
                                        color:
                                            Color.fromARGB(255, 214, 177, 27),
                                        fontSize: 16),
                                  ),
                                  DropdownButton<String>(
                                    value: dropdownVaule,
                                    icon: const Icon(
                                      Icons.arrow_downward,
                                      size: 16,
                                      color: FeatureColor,
                                    ),
                                    elevation: 10,
                                    onChanged: (String? value) {
                                      setState(() {
                                        dropdownVaule = value!;
                                      });
                                    },
                                    underline: Container(
                                      height: 2,
                                      color: titlecolor,
                                    ),
                                    items: list.map<DropdownMenuItem<String>>(
                                        (String item) {
                                      return DropdownMenuItem<String>(
                                        value: item,
                                        child: Text(
                                          item,
                                          style: const TextStyle(
                                              color: Color.fromARGB(
                                                  255, 38, 104, 165),
                                              fontSize: 16),
                                        ),
                                      );
                                    }).toList(),
                                  ),
                                ],
                              ),
                              20.heightBox,
                              "Description"
                                  .text
                                  .color(FeatureColor)
                                  .fontFamily(bold)
                                  .make(),
                              TextField(
                                style: const TextStyle(
                                    color: Color.fromARGB(255, 137, 165, 204)),
                                controller: _descriptionController,
                                decoration: const InputDecoration(
                                  border: OutlineInputBorder(),
                                ),
                                maxLines: 2,
                                keyboardType: TextInputType.multiline,
                              ),
                              10.heightBox,
                              "Requirements"
                                  .text
                                  .color(FeatureColor)
                                  .fontFamily(bold)
                                  .make(),
                              TextField(
                                style: const TextStyle(
                                    color: Color.fromARGB(255, 137, 165, 204)),
                                controller: _RequirementController,
                                decoration: const InputDecoration(
                                  border: OutlineInputBorder(),
                                ),
                                maxLines: 2,
                                keyboardType: TextInputType.multiline,
                              ),
                              10.heightBox,
                              "Objectove"
                                  .text
                                  .color(FeatureColor)
                                  .fontFamily(bold)
                                  .make(),
                              TextField(
                                style: const TextStyle(
                                    color: Color.fromARGB(255, 137, 165, 204)),
                                controller: _objectController,
                                decoration: const InputDecoration(
                                  border: OutlineInputBorder(),
                                ),
                                maxLines: 2,
                                keyboardType: TextInputType.multiline,
                              ),
                              20.heightBox,
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                children: [
                                  GestureDetector(
                                    onTap: () {
                                      Get.to(() => listInstructorcourse());
                                    },
                                    child: Container(
                                      decoration: BoxDecoration(
                                          color: themecolor,
                                          border: Border.all(
                                              width: 1,
                                              color: const Color.fromARGB(
                                                  255, 63, 73, 102)),
                                          borderRadius:
                                              BorderRadius.circular(20)),
                                      alignment: Alignment.centerLeft,
                                      // ignore: sort_child_properties_last
                                      child: Align(
                                        alignment: Alignment.center,
                                        child: 'cancel'
                                            .text
                                            .fontFamily(regular)
                                            .color(Colors.white)
                                            .make(),
                                      ),
                                      height: 60,
                                      width: 100,
                                    ),
                                  ),
                                  GestureDetector(
                                    onTap: () {
                                      Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) =>
                                                  AddSection()));
                                    },
                                    child: Container(
                                      decoration: BoxDecoration(
                                          color: themecolor,
                                          border: Border.all(
                                              width: 1,
                                              color: Color.fromARGB(
                                                  255, 63, 73, 102)),
                                          borderRadius:
                                              BorderRadius.circular(20)),
                                      alignment: Alignment.centerLeft,
                                      // ignore: sort_child_properties_last
                                      child: Align(
                                        alignment: Alignment.center,
                                        child: 'Add section'
                                            .text
                                            .fontFamily(regular)
                                            .color(Colors.white)
                                            .make(),
                                      ),
                                      height: 60,
                                      width: 100,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    20.heightBox,
                    5.heightBox,
                  ],
                ),
              ),
            );
          },
        ));
  }
}
