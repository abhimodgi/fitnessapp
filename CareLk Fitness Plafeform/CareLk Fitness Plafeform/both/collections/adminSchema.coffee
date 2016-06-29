@Schemas = {}

@Posts = new Meteor.Collection('posts');

Schemas.Posts = new SimpleSchema
    title:
        type: String
        max: 60
    content:
        type: String
        autoform:
            rows: 5
    createdAt:
        type: Date
        label: 'Date'
        autoValue: ->
            if this.isInsert
                return new Date()
    owner:
        type: String
        regEx: SimpleSchema.RegEx.Id
        autoValue: ->
            if this.isInsert
                return Meteor.userId()
        autoform:
            options: ->
                _.map Meteor.users.find().fetch(), (user)->
                    label: user.emails[0].address
                    value: user._id

Posts.attachSchema(Schemas.Posts)
