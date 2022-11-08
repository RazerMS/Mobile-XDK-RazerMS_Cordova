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

var iabRef = null;
var molpaySdkUrl = 'molpay-mobile-xdk-www/index.html';

var sdkData = {
      // ------- SDK required basic data ----------
      'mp_amount' : '1.10',
      'mp_username' : '',
      'mp_password' : '',
      'mp_merchant_ID' : '',
      'mp_app_name' : '',   
      'mp_order_ID' : '', 
      'mp_currency' : 'MYR',
      'mp_country' : 'MY',  
      'mp_verification_key' : '',  
      'mp_channel' : 'multi', 
      'mp_bill_description' : 'Cordova payment test',
      'mp_bill_name' : 'MOLPay Developer',
      'mp_bill_email' : '',
      'mp_bill_mobile' : '',
      'mp_channel_editing' : false,
      'mp_editing_enabled' : false,
      'mp_transaction_id' : '', // Required if mp_request_type is 'Receipt'
      'mp_request_type' : '', // 'Receipt' for Cash channels
};


var app = {

    onMOLPayLoadstart: function(event) {
        console.log('onMOLPayLoadstart event = '+JSON.stringify(event, null, ''));
    },

    onMOLPayLoadstop: function(event) {
        console.log('onMOLPayLoadstop event = '+JSON.stringify(sdkData, null, ''));
        iabRef.executeScript({
            code: "updateSdkData("+JSON.stringify(sdkData)+");"
        }, function() {
            alert("updateSdkData executed successfully");
        });
    },
    

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        window.open = cordova.InAppBrowser.open;
        iabRef = window.open(molpaySdkUrl, '_blank', 'location=no');
        iabRef.addEventListener('loadstart', app.onMOLPayLoadstart);
        iabRef.addEventListener('loadstop', app.onMOLPayLoadstop);

        // iabRef = window.open(molpaySdkUrl,'_blank','location=yes,hardwareback=yes');
    }
};

app.initialize();
