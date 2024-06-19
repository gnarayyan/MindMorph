import 'package:flutter/material.dart';
import 'package:morph/const/color.dart';
import 'package:morph/const/fonts.dart';
import 'package:morph/homescreen/profile.dart/Instructorpage/Instructorcourselist.dart';
import 'package:velocity_x/velocity_x.dart';

class Coursetitle {
  String name;
  Coursetitle({
    required this.name,
  });
}
// subtitle chahiyema yo garne haita
// class Subtitle {
//   String section_name;
//   Subtitle({
//     required this.section_name,
//   });
// }

class Percentage_Vaule {
  String percent;
  Percentage_Vaule({
    required this.percent,
  });
}

class Uploadprogress extends StatefulWidget {
  const Uploadprogress({super.key});

  @override
  State<Uploadprogress> createState() => _PreViewCourseState();
}

class _PreViewCourseState extends State<Uploadprogress> {
  List<Coursetitle> list = [
    Coursetitle(name: 'Flutter Introduction '),
    Coursetitle(name: 'Dart Introduction '),
    Coursetitle(name: 'Basic Widget '),
    Coursetitle(name: 'Flutter Introduction '),
    Coursetitle(name: 'Dart Introduction '),
    Coursetitle(name: 'Basic Widget '),
  ];
  List<Percentage_Vaule> percentvalue = [
    Percentage_Vaule(percent: '100'),
    Percentage_Vaule(percent: '50'),
    Percentage_Vaule(percent: '70'),
    Percentage_Vaule(percent: '100'),
    Percentage_Vaule(percent: '50'),
    Percentage_Vaule(percent: '70'),
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: themecolor,
        iconTheme: const IconThemeData(color: FeatureColor),
      ),
      body: Container(
        height: context.screenHeight,
        width: context.screenWidth,
        color: themecolor,
        child: Column(
          children: [
            50.heightBox,
            'uploading progress'.text.color(titlecolor).size(18).make(),
            10.heightBox,
            Container(
              padding: const EdgeInsets.all(10),
              width: MediaQuery.of(context).size.width * 0.98,
              height: MediaQuery.of(context).size.height * 0.45,
              decoration: BoxDecoration(
                color: boxtilecolor,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Column(
                children: [
                  Expanded(
                    child: ListView.builder(
                        itemCount: list.length,
                        shrinkWrap: true,
                        itemBuilder: ((Context, index) {
                          final Uploadlist = list[index];
                          final percentlist = percentvalue[index];
                          return ListTile(
                            trailing: Title(
                                color: Colors.green,
                                child: Text(
                                  percentlist.percent + '%',
                                  style: const TextStyle(
                                      color: Colors.green, fontSize: 14),
                                )),
                            leading: Text(
                              Uploadlist.name,
                              style: const TextStyle(
                                  color: Colors.amber, fontSize: 14),
                            ),
                          );
                        })),
                  ),
                ],
              ),
            ),
            10.heightBox,
            GestureDetector(
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => listInstructorcourse()));
              },
              child: Container(
                decoration: BoxDecoration(
                    color: themecolor,
                    border: Border.all(
                        width: 1,
                        color: const Color.fromARGB(255, 63, 73, 102)),
                    borderRadius: BorderRadius.circular(20)),
                alignment: Alignment.centerLeft,
                child: Align(
                  alignment: Alignment.center,
                  child: 'Done'
                      .text
                      .fontFamily(regular)
                      .color(Color.fromARGB(255, 127, 166, 197))
                      .make(),
                ),
                height: 60,
                width: 100,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
