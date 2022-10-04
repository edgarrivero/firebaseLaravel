import './bootstrap';
import {
    saveTask,
    getTask,
    onGetTasks,
    deleteTask,
    editTask,
    updateTask,
    onGetTasksNext,
    onGetTasksPrevious,
    getReferenceUser
} from './firebase';

const taskForm = document.getElementById('task-form');
//const importExcel = document.getElementById('btn-import-excel');
const btnPrevious = document.getElementById('btnPrevious');
const btnNext = document.getElementById('btnNext');

let selectedFile;
let obj = null;
let statusTask = false;
let idTask = '';
let lastVisible = null;
let previousVisible = null;

window.addEventListener('DOMContentLoaded', async() => {
    //const querySnapshot = await getTask();
    onGetTasks( (querySnapshot) => {
        let i = 0;
        $("#tableBody").empty();
        querySnapshot.forEach(doc => {
            i++;
            let records = `<tr>
                                <th>${i} </th>
                                <td>${doc.data().user} </td>
                                <td>${doc.data().nombreSolicitante} </td>
                                <td>${doc.data().tipoVehiculo}</td>
                                <td>${doc.data().cantidad}</td>
                                <td>${ doc.data().created_at }</td>
                                <td width="5%">
                                    <div class="dropdown">
                                      <button class="btn dropdown-toggle border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                        </svg>
                                      </button>
                                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><button type="button" class="dropdown-item btn-edit" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#exampleModal" >Editar</button></li>
                                        <li><button type="button" class="dropdown-item btn-delete text-danger" data-id="${doc.id}"  >Eliminar</button></li>
                                      </ul>
                                    </div>
                                </td>
                            </tr>`;
            $("#tableBody").append(records);
        })

        lastVisible = querySnapshot.docs[querySnapshot.docs.length -1];
        previousVisible = querySnapshot.docs[0];

        const containerBtn = document.getElementById('tableBody');
        const btnsDelete = containerBtn.querySelectorAll('.btn-delete');
        const btnsEdits = containerBtn.querySelectorAll('.btn-edit');
        btnsDelete.forEach(btn => {
            btn.addEventListener('click', (e) => {
                deleteTask(e.target.dataset.id);
            })
        })
        btnsEdits.forEach( (btn) => {
            btn.addEventListener('click', async (e) => {
                const doc = await editTask(e.target.dataset.id);
                const task = doc.data();
                taskForm['amount'].value = task.cantidad;
                taskForm['date'].value = task.created_at;
                taskForm['name'].value = task.nombreSolicitante;
                taskForm['typeCar'].value = task.tipoVehiculo;

                statusTask = true;
                idTask = e.target.dataset.id;
            })
        })
    })
});

btnNext.addEventListener('click', async() => {
    onGetTasksNext((querySnapshotNext)=> {
        let i = 0;
        $("#tableBody").empty();
        querySnapshotNext.forEach(doc => {
            i++;
            let records = `<tr>
                        <th>${i} </th>
                        <td>${doc.data().nombreSolicitante} </td>
                        <td>${doc.data().tipoVehiculo}</td>
                        <td>${doc.data().cantidad}</td>
                        <td>${doc.data().created_at}</td>
                        <td width="5%">
                            <div class="dropdown">
                              <button class="btn dropdown-toggle border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                              </button>
                              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><button type="button" class="dropdown-item btn-edit" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#exampleModal" >Editar</button></li>
                                <li><button type="button" class="dropdown-item btn-delete text-danger" data-id="${doc.id}"  >Eliminar</button></li>
                              </ul>
                            </div>
                        </td>
                    </tr>`;

            $("#tableBody").append(records);
        })
        lastVisible = querySnapshotNext.docs[querySnapshotNext.docs.length -1];
        previousVisible = querySnapshotNext.docs[0];
        const containerBtnNext = document.getElementById('tableBody');
        const btnsDeleteNext = containerBtnNext.querySelectorAll('.btn-delete');
        const btnsEditsNext = containerBtnNext.querySelectorAll('.btn-edit');
        btnsDeleteNext.forEach(btn => {
            btn.addEventListener('click', (e) => {
                deleteTask(e.target.dataset.id);
            })
        })
        btnsEditsNext.forEach( (btnEdits) => {
            btnEdits.addEventListener('click', async (eve) => {
                const doc = await editTask(eve.target.dataset.id);
                console.log(doc.data());

                const taskNext = doc.data();
                taskForm['amount'].value = taskNext.cantidad;
                taskForm['date'].value = taskNext.created_at;
                taskForm['name'].value = taskNext.nombreSolicitante;
                taskForm['typeCar'].value = taskNext.tipoVehiculo;

                statusTask = true;
                idTask = eve.target.dataset.id;
            })
        })
    },lastVisible)
});

btnPrevious.addEventListener('click', () => {
    onGetTasksPrevious((querySnapshotPrevious)=> {
        let i = 0;
        $("#tableBody").empty();
        let documents = querySnapshotPrevious.docs.reverse();
        documents.forEach(doc => {
            i++;
            let records = `<tr>
                        <th>${i} </th>
                        <td>${doc.data().nombreSolicitante} </td>
                        <td>${doc.data().tipoVehiculo}</td>
                        <td>${doc.data().cantidad}</td>
                        <td>${doc.data().created_at}</td>
                        <td width="5%">
                            <div class="dropdown">
                              <button class="btn dropdown-toggle border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                              </button>
                              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><button type="button" class="dropdown-item btn-edit" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#exampleModal" >Editar</button></li>
                                <li><button type="button" class="dropdown-item btn-delete text-danger" data-id="${doc.id}"  >Eliminar</button></li>
                              </ul>
                            </div>
                        </td>
                    </tr>`;

            $("#tableBody").append(records);
        })
        lastVisible = querySnapshotPrevious.docs.reverse()[querySnapshotPrevious.docs.length -1];
        previousVisible = querySnapshotPrevious.docs.reverse()[0];
        const containerBtnPrevious = document.getElementById('tableBody');
        const btnsDeletePrevious = containerBtnPrevious.querySelectorAll('.btn-delete');
        const btnsEditsPrevious = containerBtnPrevious.querySelectorAll('.btn-edit');
        btnsDeletePrevious.forEach(btn => {
            btn.addEventListener('click', (e) => {
                deleteTask(e.target.dataset.id);
            })
        })
        btnsEditsPrevious.forEach( (btnEditsPrevious) => {
            btnEditsPrevious.addEventListener('click', async (evePrevious) => {
                const doc = await editTask(evePrevious.target.dataset.id);
                const taskPrevious = doc.data();
                taskForm['amount'].value = taskPrevious.cantidad;
                taskForm['date'].value = taskPrevious.created_at;
                taskForm['name'].value = taskPrevious.nombreSolicitante;
                taskForm['typeCar'].value = taskPrevious.tipoVehiculo;

                statusTask = true;
                idTask = evePrevious.target.dataset.id;
            })
        })
    },previousVisible)
});

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    // $("#exampleModal").modal('hide');
    const cantidad = taskForm['amount'];
    const fecha = taskForm['date'];
    const user = taskForm['name'];
    const typeCar = taskForm['typeCar'];

    let docRef = null;
    let doc = null;
    if (statusTask){
        updateTask(idTask,{
            cantidad: cantidad.value,
            date: parseInt(fecha.value),
            typeCar: typeCar.value,
            nombreSolicitante: user.value
        } );

        statusTask = false;
    }else {
        docRef = await saveTask(cantidad.value,fecha.value,typeCar.value,user.value);
        doc = await editTask(docRef["id"]);

    }
    taskForm.reset();
    onGetTasks( (querySnapshot1) => {
        let i = 0;
        $("#tableBody").empty();
        querySnapshot1.forEach(doc => {
            i++;
            console.log(doc.data().user)
            let records = `<tr>
                                <th>${i} </th>
                                <td>${doc.data().user} </td>
                                <td>${doc.data().nombreSolicitante} </td>
                                <td>${doc.data().tipoVehiculo}</td>
                                <td>${doc.data().cantidad}</td>
                                <td>${doc.data().created_at}</td>
                                <td width="5%">
                                    <div class="dropdown">
                                      <button class="btn dropdown-toggle border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                        </svg>
                                      </button>
                                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><button type="button" class="dropdown-item btn-edit" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#exampleModal" >Editar</button></li>
                                        <li><button type="button" class="dropdown-item btn-delete text-danger" data-id="${doc.id}"  >Eliminar</button></li>
                                      </ul>
                                    </div>
                                </td>
                            </tr>`;
            $("#tableBody").append(records);
        })

        lastVisible = querySnapshot1.docs[querySnapshot1.docs.length -1];
        previousVisible = querySnapshot1.docs[0];

        const containerBtn1 = document.getElementById('tableBody');
        const btnsDelete1 = containerBtn1.querySelectorAll('.btn-delete');
        const btnsEdits1 = containerBtn1.querySelectorAll('.btn-edit');
        btnsDelete1.forEach(btn1 => {
            btn1.addEventListener('click', (e) => {
                deleteTask(e.target.dataset.id);
            })
        })
        btnsEdits1.forEach( (btn1) => {
            btn1.addEventListener('click', async (e1) => {
                const doc = await editTask(e1.target.dataset.id);
                const task1 = doc.data();
                taskForm['amount'].value = task1.cantidad;
                taskForm['date'].value = task1.created_at;
                taskForm['name'].value = task1.nombreSolicitante;
                taskForm['typeCar'].value = task1.tipoVehiculo;

                statusTask = true;
                idTask = e1.target.dataset.id;
            })
        })
    })

    $("#nameAlert").text(doc.data().nombreSolicitante);
    //$("#alertCreate").removeClass("d-none");
    const alertContainer = document.getElementById("alertCreate");
    alertContainer.classList.remove("d-none");


});

document
    .getElementById("fileUpload")
    .addEventListener("change", function (event) {
        selectedFile = event.target.files[0];
    });
document
    .getElementById("uploadExcel")
    .addEventListener("click", function () {
        if (selectedFile) {
            let fileReader = new FileReader();
            fileReader.onload = function (event) {
                let data = event.target.result;

                let workbook = XLSX.read(data, {
                    type: "binary"
                });
                workbook.SheetNames.forEach( sheet => {
                    let rowObject = XLSX.utils.sheet_to_row_object_array(
                        workbook.Sheets[sheet]
                    );
                    let jsonObject = JSON.stringify(rowObject);
                    obj = JSON.parse(jsonObject);
                    console.log(obj)
                    obj.forEach(async function (e, i) {
                        try {
                            let userRef = await getReferenceUser(e.Identificacion);
                            //let dateNew = Date.parse(e.FechaCompra);
                            let dateNew = moment(e.FechaCompra);
                            let dateNew2 = new Date(e.FechaCompra);
                            saveTask(e.Cantidad,dateNew2,e.TipoVehiculo,e.Usuario,userRef.docs[0].ref);
                        }catch (e) {
                            console.log(e);
                        }
                    })
                });
            };
            fileReader.readAsBinaryString(selectedFile);
        }
    });






