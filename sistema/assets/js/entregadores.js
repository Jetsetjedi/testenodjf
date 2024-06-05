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
let diventregadores = document.getElementById('diventregadores');

//start pagina 
(function($){
let entrega;
    firebase.database().ref('/speedwork/interesse/entregador/').once('value', function (snapentrega) {
        
        entrega = "";
        snapentrega.forEach(function (item) {

            entrega = entrega+ '<div class="col-sm-6 col-lg-4 col-xxl-3">'+
                        '<div class="card card-bordered">'+
                            '<div class="card-inner">'+
                                '<div class="team">'+
                                    '<div class="team-options">'+
                                        '<div class="drodown">'+
                                            '<a href="#" class="dropdown-toggle btn btn-sm btn-icon btn-trigger" data-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>'+
                                            '<div class="dropdown-menu dropdown-menu-right">'+
                                                '<ul class="link-list-opt no-bdr">'+
                                                    // '<li><a href="#"><em class="icon ni ni-focus"></em><span>Quick View</span></a></li>'+
                                                    // '<li><a href="#"><em class="icon ni ni-eye"></em><span>View Details</span></a></li>'+
                                                    // '<li><a href="#"><em class="icon ni ni-mail"></em><span>Send Email</span></a></li>'+
                                                    // '<li class="divider"></li>'+
                                                    // '<li><a href="#"><em class="icon ni ni-shield-star"></em><span>Reset Pass</span></a></li>'+
                                                    // '<li><a href="#"><em class="icon ni ni-shield-off"></em><span>Reset 2FA</span></a></li>'+
                                                    // '<li><a href="#"><em class="icon ni ni-na"></em><span>Suspend User</span></a></li>'+
                                                '</ul>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="user-card user-card-s2">'+
                                        '<div class="user-avatar lg bg-primary">'+
                                            '<span>ET</span>'+
                                            '<div class="status dot dot-lg dot-success"></div>'+
                                        '</div>'+
                                        '<div class="user-info">'+
                                            '<h6>'+item.val().nomeu+'</h6>'+
                                            '<span class="sub-text">'+item.val().moduseru+'</span>'+
                                        '</div>'+
                                    '</div>'+
                                    '<ul class="team-info">'+
                                        '<li><span>Data</span><span>'+item.val().dtacria+'</span></li>'+
                                        '<li><span>Contato</span><span>'+item.val().whatsu+'</span></li>'+
                                        '<li><span>'+item.val().emailu+'</span></li>'+
                                    '</ul>'+
                                    // '<div class="team-view">'+
                                    //     '<a href="html/user-details-regular.html" class="btn btn-block btn-dim btn-primary"><span>View Profile</span></a>'+
                                    // '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                '</div>';
                     
                       

        });
        document.getElementById('diventregadores').innerHTML = entrega;
    });// fim firebase snapshot


})(jQuery);//fim start pagina

/**
 *  Functions  *  
*/


  

/**
 *  Fim Functions *
 */