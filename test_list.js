item =new Meteor.Collection(null)

item.helpers({
  "test":function()
  {
    return "this is a test"
  }
})
if (Meteor.isClient) {
  for(var i=0;i<10;i++)
      item.insert({title:"item "+i})

  Template.hello.helpers({
      settings:function()
      {
        var custom={
          key: '123', label: "123", fn: function (value, object) {
                return object.test()
            }
        }
        return{
          fields: ["title", custom],
                collection: item.find(),
                rowsPerPage: 10,
                showFilter: true
        }
      }
  });

  Template.hello.events({
    'click .reactive-table tr': function (event) {
    // set the blog post we'll display details and news for
    var post = this;
     item.update(this._id,{$set:{title:"updated"}})
  }
  });
}
