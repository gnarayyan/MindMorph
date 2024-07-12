import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_keyboard_visibility/flutter_keyboard_visibility.dart';
import 'package:get/get.dart';
import 'package:morph/const/color.dart';
import 'package:morph/const/fonts.dart';
import 'package:velocity_x/velocity_x.dart';

const List<String> list = <String>[
  'Flutter basic course',
  'Java full courses',
  'CI/CD development'
];
String dropdownValue = list.first;

class InstructorAssignmentPage extends StatefulWidget {
  const InstructorAssignmentPage({Key? key}) : super(key: key);

  @override
  _InstructorAssignmentPageState createState() =>
      _InstructorAssignmentPageState();
}

class _InstructorAssignmentPageState extends State<InstructorAssignmentPage> {
  TextEditingController _courseNameController = TextEditingController();
  TextEditingController _priceController = TextEditingController();
  TextEditingController points = TextEditingController();
  TextEditingController _RequirementController = TextEditingController();
  TextEditingController _objectController = TextEditingController();
  DateTime? _selectedDate;
  TimeOfDay? _selectedTime;
  PlatformFile? pickedFile;

  Future<void> _selectDateTime(BuildContext context) async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: _selectedDate ?? DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );
    if (pickedDate != null) {
      final TimeOfDay? pickedTime = await showTimePicker(
        context: context,
        initialTime: _selectedTime ?? TimeOfDay.now(),
      );
      if (pickedTime != null) {
        setState(() {
          _selectedDate = pickedDate;
          _selectedTime = pickedTime;
        });
      }
    }
  }

  Future selectFile() async {
    final result = await FilePicker.platform.pickFiles();
    if (result == null) return;
    setState(() {
      pickedFile = result.files.first;
    });
  }

  String getFormattedDateTime() {
    if (_selectedDate == null || _selectedTime == null)
      return 'No Date/Time Chosen';
    final DateTime dateTime = DateTime(
      _selectedDate!.year,
      _selectedDate!.month,
      _selectedDate!.day,
      _selectedTime!.hour,
      _selectedTime!.minute,
    );
    return '${dateTime.year}/${dateTime.month}/${dateTime.day} ${dateTime.hour}:${dateTime.minute.toString().padLeft(2, '0')} ${dateTime.hour == DayPeriod.am ? 'AM' : 'PM'}';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: boxtilecolor,
        iconTheme: const IconThemeData(color: titlecolor),
        centerTitle: true,
        title: const Text(
          "Instructor Assignment",
          style: TextStyle(color: titlecolor, fontSize: 20),
        ),
      ),
      body: KeyboardVisibilityBuilder(
        builder: (context, isKeyboardVisible) {
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
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          5.heightBox,
                          const Text(
                            "Add Assignment",
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
                                  color: FeatureColor, fontFamily: semibold),
                              border: UnderlineInputBorder(),
                            ),
                            style: const TextStyle(
                                color: Color.fromARGB(255, 137, 165, 204)),
                          ),
                          TextFormField(
                            controller: _priceController,
                            decoration: const InputDecoration(
                              labelText: 'Description:',
                              labelStyle: TextStyle(
                                  color: FeatureColor, fontFamily: semibold),
                              border: UnderlineInputBorder(),
                            ),
                            maxLines: 4,
                            style: const TextStyle(
                                color: Color.fromARGB(255, 137, 165, 204)),
                          ),
                          30.heightBox,
                          Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              const Text(
                                'Select courses :',
                                style: TextStyle(
                                    color: FeatureColor, fontSize: 16),
                              ),
                              20.widthBox,
                              DropdownButton<String>(
                                value: dropdownValue,
                                icon: const Icon(
                                  Icons.arrow_downward,
                                  size: 16,
                                  color: FeatureColor,
                                ),
                                elevation: 10,
                                onChanged: (String? value) {
                                  setState(() {
                                    dropdownValue = value!;
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
                                          color:
                                              Color.fromARGB(255, 38, 104, 165),
                                          fontSize: 16),
                                    ),
                                  );
                                }).toList(),
                              ),
                            ],
                          ),
                          Divider(),
                          TextFormField(
                            controller: points,
                            decoration: const InputDecoration(
                              labelText: 'Points:',
                              labelStyle: TextStyle(
                                  color: Colors.amber, fontFamily: semibold),
                            ),
                            style: const TextStyle(
                                color: Color.fromARGB(255, 137, 165, 204)),
                          ),
                          10.heightBox,
                          Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              TextButton(
                                onPressed: () => _selectDateTime(context),
                                child: const Text('Select Date & Time :',
                                    style: TextStyle(color: titlecolor)),
                              ),
                              Text(
                                getFormattedDateTime(),
                                style: TextStyle(color: Colors.amber),
                              ),
                            ],
                          ),
                          10.heightBox,
                          Row(
                            children: [
                              const Align(
                                alignment: Alignment.centerLeft,
                                child: Text('Assignment file:',
                                    style: TextStyle(
                                        color: FeatureColor, fontSize: 17)),
                              ),
                            ],
                          ),
                          15.heightBox,
                          Container(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(10),
                              color: const Color.fromARGB(255, 125, 155, 207),
                            ),
                            height: context.height * 0.03,
                            width: context.width * 0.8,
                            child: Text(
                              pickedFile != null
                                  ? pickedFile!.name
                                  : 'Selected File',
                              style: const TextStyle(
                                  color: Color.fromARGB(255, 100, 94, 94)),
                            ),
                          ),
                          40.heightBox,
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              GestureDetector(
                                onTap: () {
                                  selectFile();
                                },
                                child: Container(
                                  decoration: BoxDecoration(
                                      color: themecolor,
                                      border: Border.all(
                                          width: 1,
                                          color: const Color.fromARGB(
                                              255, 63, 73, 102)),
                                      borderRadius: BorderRadius.circular(20)),
                                  alignment: Alignment.centerLeft,
                                  child: Align(
                                    alignment: Alignment.center,
                                    child: 'select'
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
                                onTap: () {},
                                child: Container(
                                  decoration: BoxDecoration(
                                      color: themecolor,
                                      border: Border.all(
                                          width: 1,
                                          color: const Color.fromARGB(
                                              255, 63, 73, 102)),
                                      borderRadius: BorderRadius.circular(20)),
                                  alignment: Alignment.centerLeft,
                                  child: Align(
                                    alignment: Alignment.center,
                                    child: 'ADD'
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
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
