Package.describe({
    name: 'jalik:ufs-local',
    version: '0.2.1',
    author: 'karl.stein.pro@gmail.com',
    summary: 'File system based store for UploadFS',
    homepage: 'https://github.com/jalik/jalik-ufs-local',
    git: 'https://github.com/jalik/jalik-ufs-local.git',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.2');
    api.use('webapp', 'server');
    api.use('jalik:ufs@0.2.0');
    api.addFiles('ufs-local.js');
});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('jalik:ufs-local');
    api.addFiles('ufs-local-tests.js');
});

Npm.depends({
    mkdirp: "0.3.5"
});