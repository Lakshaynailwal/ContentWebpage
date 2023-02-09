

// $(document).ready(function () {
//     $('#up').submit(function (e) {
//         e.preventDefault();

//         $.ajax({
//             url: "/blog/upload",
//             type: "POST",
//             data: new FormData(this),
//             contentType: false,
//             cache: false,
//             processData: false,
//             success: function (data) {
//                 if (data.success == true) {
//                     $('#imageupload').val(data.path)
//                     alert(data.msg)
//                     $('#upload').modal('hide')
//                 }
//                 else {
//                     alert(data.msg)
//                 }
//             }
//         })

//     })
// })