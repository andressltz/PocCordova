/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        self = this;
        new SQLiteStorageService().done(function (service) {
            self.storageService = service;

            $('#view-home').addClass('show');
            $('#view-home').removeClass('hide');
            $('#view-list').addClass('hide');
            $('#view-list').removeClass('show');
            $('#view-register').addClass('hide');
            $('#view-register').removeClass('show');

            document.getElementById("btViewAll").addEventListener("click", self.openAllRegisters);
            document.getElementById("btRegister").addEventListener("click", self.openNewRegister);
            document.getElementById("btSave").addEventListener("click", self.saveRegister);
        }).fail(function (error) {
            console.error('Error on initialize database', error);
            alert('Ocorreu um erro ao iniciar o banco de dados');
        });

        this.overrideBrowserAlert();
    },

    openAllRegisters: function (e) {
        e.preventDefault();

        var $registerList = $('#registerList');
        var $registerContainer = $('.register').remove();

        var registerList = self.storageService.getRegister().done(function (registers) {
            for (var register in registers) {
                var $div = $registerContainer.clone();
                var register = registers[register];

                $div.find('.txtListAddress').text(register.endereco);
                $div.find('.txtListDistrict').text(register.bairro);
                $div.find('.txtListImpact').text('Impacto nível ' + register.impacto);

                $registerList.append($div);
            }
        }).fail(function (error) {
            console.error('Error on open all registers', error);
            alert('Ocorreu um erro ao buscar os registros');
        });

        $('#view-home').addClass('hide');
        $('#view-home').removeClass('show');
        $('#view-list').addClass('show');
        $('#view-list').removeClass('hide');
        $('#view-register').addClass('hide');
        $('#view-register').removeClass('show');
    },

    openNewRegister: function (e) {
        e.preventDefault();
        $('#view-home').addClass('hide');
        $('#view-home').removeClass('show');
        $('#view-list').addClass('hide');
        $('#view-list').removeClass('show');
        $('#view-register').addClass('show');
        $('#view-register').removeClass('hide');
    },

    saveRegister: function (e) {
        e.preventDefault();

        var address = $('#txtAddress').val();
        var district = $('#txtDistrict').val();
        var impact = $('#txtImpact').val();
        var description = $('#txtDescription').val();

        if (!address || !district || !impact || !description) {
            alert('Por favor, preencha todos os campos');
            return;
        } else {
            var result = self.storageService.addRegister(address, district, impact, description);
            result.done(function () {
                alert('Ocorrência salva com sucesso');
                $('#view-home').addClass('show');
                $('#view-home').removeClass('hide');
                $('#view-list').addClass('hide');
                $('#view-list').removeClass('show');
                $('#view-register').addClass('hide');
                $('#view-register').removeClass('show');
            }).fail(function (error) {
                console.error('Error on save data', error);
                alert('Ocorreu um erro ao salvar os dados');
            });
        }
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    // showHome: function() {
    //     $('#view-home').addClass('show');
    //     $('#view-home').removeClass('hide');
    //     $('#view-list').addClass('hide');
    //     $('#view-list').removeClass('show');
    //     $('#view-register').addClass('hide');
    //     $('#view-register').removeClass('show');
    // },

    // showList: function() {
    //     $('#view-home').addClass('hide');
    //     $('#view-home').removeClass('show');
    //     $('#view-list').addClass('show');
    //     $('#view-list').removeClass('hide');
    //     $('#view-register').addClass('hide');
    //     $('#view-register').removeClass('show');
    // },

    // showNewRegister: function() {
    //     $('#view-home').addClass('hide');
    //     $('#view-home').removeClass('show');
    //     $('#view-list').addClass('hide');
    //     $('#view-list').removeClass('show');
    //     $('#view-register').addClass('show');
    //     $('#view-register').removeClass('hide');
    // }

    overrideBrowserAlert: function () {
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "POC",      // title
                    'OK'        // buttonName
                );
            };
        }
    }
};

app.initialize();