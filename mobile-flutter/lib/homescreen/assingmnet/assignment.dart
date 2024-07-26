import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:morph/const/color.dart';
import 'package:morph/const/fonts.dart';
import 'package:velocity_x/velocity_x.dart';

class Asignmentpage extends StatefulWidget {
  const Asignmentpage({Key? key}) : super(key: key);

  @override
  State<Asignmentpage> createState() => _AsignmnetState();
}

class _AsignmnetState extends State<Asignmentpage> {
  PlatformFile? pickedfile;
  String date = 'March 29, 2024'; // Example date

  Future selectfile() async {
    final result = await FilePicker.platform.pickFiles();
    if (result == null) return;
    setState(() {
      pickedfile = result.files.first;
    });
  }

  Future uploadfile() async {
    // Upload file logic here
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          width: context.screenWidth,
          height: context.screenHeight,
          color: themecolor,
          child: Column(
            children: [
              50.heightBox,
              Card(
                color: backgrounghilghtcolor,
                shadowColor: const Color.fromARGB(255, 17, 17, 16),
                clipBehavior: Clip.hardEdge,
                child: SizedBox(
                  height: 200,
                  width: 500,
                  child: Column(
                    children: [
                      Row(
                        children: [
                          Container(
                            alignment: Alignment.centerRight,
                            decoration: const BoxDecoration(
                              shape: BoxShape.circle,
                            ),
                            child: Image.network(
                              'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTGNBuKZS2dQ8gViURYxqj0ih63BJgwf4e1KAPzMc1AyYVjDkc_',
                              width: 75,
                              fit: BoxFit.cover,
                            ),
                          ),
                          15.widthBox,
                          'Flutter Basic courses'
                              .text
                              .size(20)
                              .color(titlecolor)
                              .fontFamily(bold)
                              .make(),
                          70.widthBox,
                          Icon(
                            size: 36,
                            Icons.school,
                            color: Color.fromARGB(255, 86, 119, 142),
                          ),
                        ],
                      ),
                      20.heightBox,
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          'Points: 10'
                              .text
                              .size(20)
                              .color(Colors.amber)
                              .fontFamily(bold)
                              .make(),
                          30.widthBox,
                          const SizedBox(height: 8),
                          Row(
                            children: [
                              const Icon(
                                Icons.calendar_today,
                                color: titlecolor,
                              ),
                              const SizedBox(width: 8),
                              Text(
                                'Due Date: $date',
                                style: TextStyle(
                                    fontSize: 13, color: Colors.amber),
                              ),
                            ],
                          ),
                        ],
                      ),
                      20.heightBox,
                      Column(
                        children: [
                          Align(
                            alignment: Alignment.topLeft,
                            child:
                                'Complete this given task and submit your work'
                                    .text
                                    .size(13)
                                    .color(Color.fromARGB(255, 190, 214, 254))
                                    .fontFamily(bold)
                                    .make(),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              5.heightBox,
              Card(
                child: Container(
                  height: context.height * 0.2,
                  width: context.width,
                  decoration: BoxDecoration(
                    border: Border.all(color: FeatureColor),
                    color: boxtilecolor,
                  ),
                  child: Text(
                    'description here',
                    style: TextStyle(color: titlecolor),
                  ),
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Container(
                    height: 20,
                    width: context.width * 0.7,
                    color: subtexColor,
                    child: const Text('Attachment file'),
                  ),
                  SizedBox(
                    height: 25,
                    child: ElevatedButton(
                      style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all(
                          const Color.fromARGB(255, 155, 175, 192),
                        ),
                      ),
                      onPressed: () {},
                      child: const Icon(
                        Icons.download,
                        color: subtexColor,
                      ),
                    ),
                  ),
                ],
              ),
              10.heightBox,
              SingleChildScrollView(
                physics: const BouncingScrollPhysics(),
                child: Card(
                  color: backgrounghilghtcolor,
                  shadowColor: const Color.fromARGB(255, 17, 17, 16),
                  clipBehavior: Clip.hardEdge,
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      children: [
                        TextFormField(
                          style: const TextStyle(color: FeatureColor),
                          decoration: const InputDecoration(
                            hintText: "write comment",
                            hintStyle: TextStyle(color: Colors.white54),
                            filled: true,
                            fillColor: Color.fromARGB(255, 86, 119, 142),
                            border: OutlineInputBorder(
                              borderSide: BorderSide.none,
                            ),
                          ),
                        ),
                        40.heightBox,
                        if (pickedfile != null)
                          Container(
                            height: 20,
                            width: 300,
                            color: Color.fromARGB(255, 221, 221, 220),
                            child: Text(pickedfile!.name),
                          ),
                        30.heightBox,
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                foregroundColor: Colors.white,
                                backgroundColor:
                                    Color.fromARGB(255, 86, 119, 142),
                                elevation: 5,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                              ),
                              onPressed: selectfile,
                              child: Text('select'),
                            ),
                            ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                foregroundColor: Colors.white,
                                backgroundColor:
                                    Color.fromARGB(255, 86, 119, 142),
                                elevation: 5,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                              ),
                              onPressed: () {},
                              child: Text('turn in'),
                            ),
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'point:8/10',
                              style: TextStyle(color: Colors.amber),
                            ),
                            Card(
                              child: Container(
                                height: context.height * 0.1,
                                width: context.width,
                                decoration: BoxDecoration(
                                  border: Border.all(color: FeatureColor),
                                  color: boxtilecolor,
                                ),
                                child: Text(
                                  'feedback',
                                  style: TextStyle(color: titlecolor),
                                ),
                              ),
                            ),
                          ],
                        )
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
