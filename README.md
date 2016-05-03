
#workflow-winform-view and data API

**This sample is now retired, it is not maintained anymore.** It is provided as-is and we discourage using it in your production code. If you are looking for a .Net Desktop example with View & Data API, take a look at [view.and.data-dotnet-wpf.tutorial](https://github.com/Developer-Autodesk/view.and.data-dotnet-wpf.tutorial)

##Description

This is a sample for WinForm desktop application demoing the partial workflow of using Autodesk View and Data API

##Dependencies

This sample uses the RestSharp library. You can add it to your project using NuGet in Visual Studio.


##Setup/Usage Instructions

* Open ViewerHelperApp.sln in Visual Studio 2012/2013
* Build and run this application
* Input your consumer key and secret key, which is applied from http://developer.autodesk.com
* Click "Get Token" button to do authentication
* Input a bucket name and create a bucket by clicking "Create Bucket" button. The bucket name must match the pattern  “^[-_.a-z0-9]{3,128}$” - i.e. the bucket name must be between 3 to 128 characters long and contain only lowercase letters, numbers and the symbols ._–.  Bucket keys must be unique within the data center or region in which they were created. Therefore, to ensure uniqueness, we recommend you incorporate your company name/domain name or consumer public key (converted to lowercase) into the bucket name.
* Click "Upload file" button to select a model file and upload and start translating it. 
* You can check the translation progress by clicking "Get progress" button. A thumbnail shows up when translation is completed. 
* Click "View in browser" to open the viewer with default browser. This browser should support WebGL, latest version of Google Chrome or Firefox are recommended

For more details please refer to the first two sections of [this document](https://github.com/Developer-Autodesk/tutorial-aspnet-view.and.data.api/blob/master/handsout.pdf).  

## License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.

##Written by 

Virupaksha Aithal








