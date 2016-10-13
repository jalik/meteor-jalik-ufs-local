Package.describe({
    name: 'jalik:ufs-local',
    version: '0.2.8',
    author: 'karl.stein.pro@gmail.com',
    summary: 'File system based store for UploadFS',
    homepage: 'https://github.com/jalik/jalik-ufs-local',
    git: 'https://github.com/jalik/jalik-ufs-local.git',
    documentation: 'README.md',
    license: 'MIT'
});

Package.onUse(function (api) {
    api.versionsFrom('1.4.1.1');
    api.use('check@1.2.1');
    api.use('ecmascript@0.4.3');
    api.use('jalik:ufs@0.7.1');
    api.use('underscore@1.0.8');

    api.addFiles('ufs-local.js');
});

Npm.depends({
    mkdirp: '0.3.5'
});
