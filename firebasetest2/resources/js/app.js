import './bootstrap';
import { saveTask, getTask, onGetTasks } from './firebase';

window.addEventListener('DOMContentLoaded', async() => {
    //const querySnapshot = await getTask();
    onGetTasks( (querySnapshot)=>{
        var i = 0;
        $("#tableBody").empty();
        querySnapshot.forEach(doc => {
            i++;
            let records = `<tr>
                                <th>${i} </th>
                                <td>${doc.data().nombreSolicitante} </td>
                                <td>${doc.data().tipoVehiculo}</td>
                                <td>${doc.data().cantidad}</td>
                                <td>${doc.data().created_at}</td>
                            </tr>`;

            $("#tableBody").append(records);
        })
    })

})

const taskForm = document.getElementById('task-form')

taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const cantidad = taskForm['amount'];
    const fecha = taskForm['date'];
    const user = taskForm['name'];
    const typeCar = taskForm['typeCar'];
    saveTask(cantidad.value,fecha.value,typeCar.value,user.value);
})

const importExcel = document.getElementById('btn-import-excel');

var selectedFile;

var obj = null;
document
    .getElementById("fileUpload")
    .addEventListener("change", function (event) {
        selectedFile = event.target.files[0];
    });
document
    .getElementById("uploadExcel")
    .addEventListener("click", function () {

        if (selectedFile) {
            var fileReader = new FileReader();
            fileReader.onload = function (event) {
                var data = event.target.result;

                var workbook = XLSX.read(data, {
                    type: "binary"
                });
                workbook.SheetNames.forEach(sheet => {
                    let rowObject = XLSX.utils.sheet_to_row_object_array(
                        workbook.Sheets[sheet]
                    );
                    let jsonObject = JSON.stringify(rowObject);
                    obj = JSON.parse(jsonObject);
                    obj.forEach(function (e, i) {

                        // var model = {
                        //     name: e.usuario,
                        //     typeCar: e.typeCar
                        // }
                        // console.log(model);
                        // console.log("sera");
                        saveTask(e.Cantidad,e.FechaCompra,e.TipoVehiculo,e.Usuario);

                        // const querySnapshot = getTask();
                        // var i = 0;
                        // querySnapshot.forEach(doc => {
                        //     i++;
                        //     let records = `<tr>
                        //                         <th>${i} </th>
                        //                         <td>${doc.data().nombreSolicitante} </td>
                        //                         <td>${doc.data().tipoVehiculo}</td>
                        //                     </tr>`;
                        //
                        //     $("#tableBody").append(records);
                        // })

                        // $.ajax({
                        //     headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                        //     url: "https://testsert-b4494-default-rtdb.firebaseio.com/users.json",
                        //     type: 'POST',
                        //     contentType: "application/json",
                        //     data: JSON.stringify(model),
                        //     success: function (r) {
                        //         console.log(r);
                        //     },
                        //     error: function (xhr, status, error) {
                        //         if (xhr.responseJSON !== undefined && xhr.responseJSON.errorBag !== undefined) {
                        //             $.each(xhr.responseJSON.errorBag, function (index, value) {
                        //                 console.log(value)
                        //             });
                        //         } else {
                        //             console.log(xhr.responseJSON)
                        //         }
                        //     }
                        // });

                        // let records = `<tr>
                        //                     <th>${i} </th>
                        //                     <td>${e.nombre} </td>
                        //                     <td>${e.email}</td>
                        //                 </tr>`;
                        //
                        // $("#tableBody").append(records);
                    })

                });
            };
            fileReader.readAsBinaryString(selectedFile);
        }
    });


