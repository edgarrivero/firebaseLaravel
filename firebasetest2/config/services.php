<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'firebase' => [
        'api_Key' => 'AIzaSyD3bzbCK79ATn5JRmoawEEVhp0LB6vcrz4',
        'auth_Domain' => 'testsert-b4494.firebaseapp.com',
        'database_url' => 'https://testsert-b4494-default-rtdb.firebaseio.com/',
        'project_Id' => 'testsert-b4494',
        'storage_Bucket' => 'testsert-b4494.appspot.com',
        'messaging_Sender_Id' => '269145679875',
        'app_Id' => '1:269145679875:web:31022e45368cf76fcc8636',
        'measurement_Id' => 'G-3ELRTL385G'
    ]

];
