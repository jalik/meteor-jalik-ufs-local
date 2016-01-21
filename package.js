Package.describe({
    name: 'jalik:ufs-local',
    version: '0.2.5',
    author: 'karl.stein.pro@gmail.com',
    summary: 'File system based store for UploadFS',
    homepage: 'https://github.com/jalik/jalik-ufs-local',
    git: 'https://github.com/jalik/jalik-ufs-local.git',
    documentation: 'README.md',
    license: 'MIT'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.2');
    api.use('check');
    api.use('jalik:ufs@0.5.0');
    api.use('underscore');

    api.addFiles('ufs-local.js');
});

Npm.depends({
    mkdirp: '0.3.5'
});
