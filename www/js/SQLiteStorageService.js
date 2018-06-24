SQLiteStorageService = function () {
  var service = {};
  var db = window.sqlitePlugin ?
    window.sqlitePlugin.openDatabase({ name: "poc.cordova", location: "default" }) :
    window.openDatabase("poc.cordova", "1.0", "DB", 5000000);

  service.initialize = function () {
    var deferred = $.Deferred();
    db.transaction(function (tx) {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS AmeacaAmbientalNew ( ' +
          'IdAmeacaAmbiental integer primary key autoincrement, ' +
          'Bairro text not null, ' +
          'Endereco text not null, ' +
          'Impacto number not null, ' +
          'Ameaca text not null, ' +
          'DtAtualizacao date not null ' +
        ' )'
        , [], function (tx, res) {
          tx.executeSql('DELETE FROM AmeacaAmbiental', [], function (tx, res) {
            deferred.resolve(service);
          }, function (tx, res) {
            console.log(tx, res)
            deferred.reject('Error initializing database');
          });
        }, function (tx, res) {
          console.log(tx, res)
          deferred.reject('Error initializing database');
        });
    });
    return deferred.promise();
  }

  service.getRegister = function () {
    // fetch projects
  }

  service.addRegister = function (address, district, impact, description) {
    console.log('SALVANDO NO BANCO...')
    var deferred = $.Deferred();
    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO AmeacaAmbientalNew (Bairro, Endereco, Impacto, Ameaca) VALUES (" + district + ", " + address + ", " + impact + ", " + description + ")"
        , [], function (tx, res) {
          console.log(tx, res)
          deferred.reject('Error on save data');
        });
    });
    return deferred.promise();
  }

  return service.initialize();
}
