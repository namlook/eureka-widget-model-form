# Eureka-widget-model-form

An Eureka widget that display a form for the model. Usage:

    {
        BlogPost: {
            views: {
                collection: {
                    index: {...},
                },
                new: {
                    widgets: [
                        {
                            type: 'model-form',

                            // the widget header. If "auto", display the model's title
                            label: "Create the blog post",

                            // the actions to perform when clicking on the save and cancel button
                            actions: {
                                save: {
                                    transitionTo: 'eureka.blog-post.model.index'
                                },
                                cancel: {
                                    transitionTo: 'eureka.blog-post.collection.index'
                                },
                            }
                        }
                    ]
                },
                model: {
                    edit: {
                        widgets: [
                            {
                                type: 'model-form',

                                label: "Editing the blog post",

                                actions: {
                                    save: {
                                        transitionTo: 'eureka.blog-post.model.index'
                                    },
                                    cancel: {
                                        transitionTo: 'eureka.blog-post.model.index'
                                    },
                                }
                            }
                        ]
                    },
                }
            }
        }
    }

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
