SQLiteStorageService = function () {
  var service = {};
  var db = window.sqlitePlugin ?
    window.sqlitePlugin.openDatabase({ name: "poc.cordova", location: "default" }) :
    window.openDatabase("poc.cordova", "1.0", "DB", 5000000);

  service.initialize = function () {
    var deferred = $.Deferred();
    db.transaction(function (tx) {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS AmeacaAmbientalTwo ( ' +
          'IdAmeacaAmbiental integer primary key autoincrement, ' +
          'Bairro text not null, ' +
          'Endereco text not null, ' +
          'Impacto number not null, ' +
          'Ameaca text not null, ' +
          'DtAtualizacao date null ' +
        ' )'
        , [], function (tx, res) {
          tx.executeSql('DELETE FROM AmeacaAmbiental', [], function (tx, res) {
            deferred.resolve(service);
          }, function (tx, res) {
            console.error(tx, res);
            deferred.reject('Error initializing database');
          });
        }, function (tx, res) {
          console.error(tx, res);
          deferred.reject('Error initializing database');
        });
    });
    return deferred.promise();
  }

  service.getRegister = function () {
    var deferred = $.Deferred();

    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM AmeacaAmbientalTwo', [], function (tx, res) {
        var registers = [];
        for (var i = 0; i < res.rows.length; i++) {
          var register = {
            idAmeacaAmbiental: res.rows.item(i).IdAmeacaAmbiental,
            bairro: res.rows.item(i).Bairro,
            endereco: res.rows.item(i).Endereco,
            impacto: res.rows.item(i).Impacto,
            ameaca: res.rows.item(i).Ameaca,
            dtAtualizacao: res.rows.item(i).DtAtualizacao
          };
          registers.push(register);
        }
        deferred.resolve(registers);
      }, function (e) {
        console.error('Error on get data', e);
        deferred.reject(e);
      });
    });
    return deferred.promise();
  }

  service.addRegister = function (address, district, impact, description) {
    var deferred = $.Deferred();

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO AmeacaAmbientalTwo (Bairro, Endereco, Impacto, Ameaca, DtAtualizacao) VALUES (?, ?, ?, ?, ?)', [district, address, impact, description, new Date()], function (tx, res) {
          // console.log('Save', tx, res);
          deferred.resolve();
        }, function (tx, res) {
          console.error(tx, res);
          deferred.reject(res.message);
        });
    });

    return deferred.promise();
  }

  return service.initialize();
}
