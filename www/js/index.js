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
    initialize: function() {
        self = this;
        new SQLiteStorageService().done(function(service) {
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
        }).fail(function(error) {
            alert(error);
        });
    },

    openAllRegisters: function(e) {
        e.preventDefault();
        $('#view-home').addClass('hide');
        $('#view-home').removeClass('show');
        $('#view-list').addClass('show');
        $('#view-list').removeClass('hide');
        $('#view-register').addClass('hide');
        $('#view-register').removeClass('show');
        console.log('open all registers 2');
    },

    openNewRegister: function(e) {
        console.log('open new register 1');
        e.preventDefault();
        $('#view-home').addClass('hide');
        $('#view-home').removeClass('show');
        $('#view-list').addClass('hide');
        $('#view-list').removeClass('show');
        $('#view-register').addClass('show');
        $('#view-register').removeClass('hide');
        console.log('open new register 2');
    },

    saveRegister: function(e) {
        console.log('open save 1');
        e.preventDefault();
        $('#view-home').addClass('show');
        $('#view-home').removeClass('hide');
        $('#view-list').addClass('hide');
        $('#view-list').removeClass('show');
        $('#view-register').addClass('hide');
        $('#view-register').removeClass('show');
        console.log('open save 2');
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();