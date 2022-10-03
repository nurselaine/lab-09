'use strict';

class ModelInterface {
  constructor(model){
    this.model = model;
  }

  get(id){
    if(id){
      return this.model.findOne({ where: { id } });
    } else {
      return this.model.findAll({});
    }
  };

  create(json){
    return this.model.create(json);
  }

  async update(id, json){
    try {
      let user = await this.model.findOne({ where: { id } });
      return user.update(json);
    } catch (e) {
      console.log('user not found');
    }
  };

  delete(id){
    return this.model.destroy( {where : { id }} );
  }

};

module.exports = ModelInterface;