module.exports = {
  lize : function (model) {
    if(!Array.isArray(model)){
      model = this.data(model);
    } else if (Array.isArray(model)){
      model = this.a(model);
    }

    return model;
  },
  data : function (obj) {
    for(var p in obj.path) {
      if(p === "key"){
        obj.value.id = obj.path[p];
      } else if(p !== "collection") {
        obj.value[p] = obj.path[p];
      }
    }
    
    obj.value.createdAt = new Date(obj.value.createdAt);
    obj.value.updatedAt = new Date(obj.value.updatedAt);

    return obj.value;
  },
  a : function  (array) {
    var self = this;
    array.forEach(function (e, i){
      array[i]  = self.data(e);
    });

    return array;
  }
};
