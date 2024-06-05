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

let logout = document.getElementById('logout');
let IcurrentUID,IcurrenteEmail;

//start pagina 
(function($) {

    // Listen for auth state changes
    firebase.auth().onAuthStateChanged(onAuthStateChanged);

    //Busca recebimentos 
    carregarecebimentos();
    //Busca entregadores
    carregaentregadores();
    //Busca consumudores
    carregaconsumidores();
    // Busca lojistas
    carregalojistas();
    // Busca pestadores
    carregaprestadores();
    //Busca pedidos de transportes
    carregapeditostransporte();


    //clicando no menu sair
    logout.addEventListener("click",function(){
        firebase.auth().signOut();
        window.location.href = "../../vbinterfaces/sistema/html/login.html";
    })
    
})(jQuery);

/**
 *  Functions  *  
*/

   //carrega no Dashlite a soma do valor total para os pedidos pagos.
   function carregarecebimentos(){
    
    firebase.database().ref("/speedwork/transporters/").once('value').then(function(snaresumo){
      let statusPG = "";
      let valortotal = 0;
        
         snaresumo.forEach(function (item) {
         statusPG = item.val().statuspagamento;
         if(statusPG == "PG"){
         valortotal = formatValue(valortotal+item.val().valortotal);
         }
        });
        //atualiza a view dos administradores
        $('#viagemPG').text("R$ "+valortotal);
    
    });

  }

  //carrega a quantidade de  entregadores cadastrados
  function carregaentregadores(){
    let countentrega = 0;
    let item
    firebase.database().ref("/speedwork/interesse/entregador/").once('value').then(function(snapentregador){
        snapentregador.forEach(function(ientrega){
             item = ientrega.val().iduser;
             console.log(item);
            countentrega = countentrega+1;
        });
        $('#qtdtregadores').text(countentrega);
    });

  }

  //carrega a quantidade de  Consumidores cadastrados
  function carregaconsumidores(){
    let countconsumi = 0;
    let item
    firebase.database().ref("/speedwork/interesse/consumidor/").once('value').then(function(snapconsumidor){
        snapconsumidor.forEach(function(iconsumi){
             item = iconsumi.val().iduser;
             console.log(item);
             countconsumi = countconsumi+1;
        });
        $('#consumidores').text(countconsumi);
    });

  }
  
  //carrega a quantidade de  Consumidores cadastrados
  function carregalojistas(){
    let countlojista = 0;
    let item
    firebase.database().ref("/speedwork/interesse/lojista/").once('value').then(function(snaplojista){
        snaplojista.forEach(function(ilojist){
             item = ilojist.val().iduser;
             console.log(item);
             countlojista = countlojista+1;
        });
        $('#qtdlojistas').text(countlojista);
    });

  }

  //carrega a quantidade de  Pestadores cadastrados
  function carregaprestadores(){
    let countprestadores = 0;
    let item
    firebase.database().ref("/speedwork/interesse/prestador/").once('value').then(function(snapprestador){
        snapprestador.forEach(function(iprestad){
             item = iprestad.val().iduser;
             console.log(item);
             countprestadores = countprestadores+1;
        });
        $('#qtdprestadores').text(countprestadores);
    });

  }

    // carrega os dados dos pedidos 
    function carregapeditostransporte(){
      let itempedido = "";
      let openfile = "html/pedidos.php?pedido="
        firebase.database().ref("/speedwork/transporters/").once('value').then(function(snappedidos){
            snappedidos.forEach(function(listpedidos){
                console.log(listpedidos.val().autorizacao);
              itempedido = itempedido+
              '<div class="nk-tb-item">'+
              '<div class="nk-tb-col">'+
              '<span class="tb-lead"><a href="'+openfile+listpedidos.val().autorizacao+'">'+listpedidos.val().autorizacao+'</a></span>'+
              '</div>'+
              '<div class="nk-tb-col tb-col-sm">'+
              '<div class="user-card">'+
              '<div class="user-avatar user-avatar-sm bg-purple">'+
              '<span>CL</span>'+
              '</div>'+
              '<div class="user-name">'+
              '<span class="tb-lead">'+listpedidos.val().nomeloja+'</span>'+
              '</div>'+
              '</div>'+
              '</div>'+
              '<div class="nk-tb-col tb-col-md">'+
              '<span class="tb-sub">02/11/2020</span>'+
              '</div>'+
              '<div class="nk-tb-col tb-col-lg">'+
              '<span class="tb-sub text-primary">'+listpedidos.val().categoria+'</span>'+
              '</div>'+
              '<div class="nk-tb-col">'+
              '<span class="tb-sub tb-amount">'+listpedidos.val().valortotal+'<span> BLR </span></span>'+
              '</div>'+
              '<div class="nk-tb-col">'+
              '<span class="badge badge-dot badge-dot-xs badge-success">Pago</span>'+
              '</div>';
            });
            document.getElementById('rapidexpedidos').innerHTML = itempedido;

        });

    }
  
    //onStagechangerUser
    function onAuthStateChanged(user) {
        // We ignore token refresh events.
        if (user && IcurrentUID === user.uid) {
            return;
        }
        if (user) {
            IcurrentUID = user.uid; 
            IcurrenteEmail = user.email;
            console.log("Index:",IcurrentUID);
            console.log("Index Mail:",IcurrenteEmail);
            $('#emailuser').val(IcurrenteEmail);
            $('#nomeuser1').val(IcurrentUID);
            //abre a pagina da conta e fecha a atual
            
        }
    }

    //formatando o Valor
    function formatValue(value){
        var str = parseFloat(value).toFixed(2) + "";
        str = str.replace(".",",");
        str = " " + str;
        return str;
    }

/**
 * Fim Functio
 */