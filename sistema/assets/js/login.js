/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
let LcurrentUID;

(function($) {
let btentrar = document.getElementById('btentrar');
let uemail = document.getElementById('uemail');
let password = document.getElementById('password');

     
//botão para usuarios do sistema VB Soluções
btentrar.addEventListener('click', function () {
  if(uemail.value  == "" || password.value == ""){
        Swal.fire({
            title:"Erro de preenchimento",
            text:"Verifique os campos, todos são Obrigatório!",
            icon:"error",
         });
  }else{
       
       let email = uemail.value;
       let senha = password.value;
       loginadminVB(email,senha);
       // Listen for auth state changes
       firebase.auth().onAuthStateChanged(onAuthStateChanged);
       
  }     


});
firebase.auth().onAuthStateChanged(onAuthStateChanged);

})(jQuery);

/**
 *  Functions  *  
*/

//Login com E-mail e Senha
function loginadminVB(email,senha){
     firebase.auth().signInWithEmailAndPassword(email,senha).then((user) => {
        console.log(user);
     }).catch(function(error) {
        console.log(error);
            Swal.fire({
                title:error.code,
                text:error.message,
                icon:"error",
            });
      });
}

//onStagechangerUser
function onAuthStateChanged(user) {
    // We ignore token refresh events.
   if (user && LcurrentUID === user.uid) {
    return;
  }
  if (user) {
    LcurrentUID = user.uid; 
    console.log(LcurrentUID)
    //abre a pagina da conta e fecha a atual
    window.location.href = "../../interfaces/sistema/html/index.html";
  }
}

/**
 * Fim Functio
 */