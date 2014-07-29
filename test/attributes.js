var test = require("tape")

var h = require("../h.js")
var createElement = require("../create-element.js")
var diff = require("../diff.js")
var patch = require("../patch.js")

test("attributes can be set", function (assert) {
    var vtree = h("div", {
        attributes: {
            src: "test.jpg"
        }
    })

    var node = createElement(vtree)
    assert.equal(node.getAttribute("src"), "test.jpg")
    assert.end()
})

test("individual attributes can be unset", function (assert) {
    var leftTree = h("div", {
        attributes: {
            a: "1",
            b: "2",
            c: "3"
        }
    })

    var rightTree = h("div", {
        attributes: {
            a: "1",
            c: "3"
        }
    })

    var rootNode = createElement(leftTree)
    var patches = diff(leftTree, rightTree)

    var newRootNode = patch(rootNode, patches)

    assert.equal(newRootNode, rootNode)
    assert.equal(newRootNode.getAttribute("a"), "1")
    assert.equal(newRootNode.getAttribute("b"), null)
    assert.equal(newRootNode.getAttribute("c"), "3")
    assert.end()
})

test("attributes can be completely unset", function (assert) {
    var leftTree = h("div", {
        attributes: {
            a: "1",
            b: "2",
            c: "3"
        }
    })

    var rightTree = h("div")

    var rootNode = createElement(leftTree)
    var patches = diff(leftTree, rightTree)

    var newRootNode = patch(rootNode, patches)

    assert.equal(newRootNode, rootNode)
    assert.equal(newRootNode.getAttribute("a"), null)
    assert.equal(newRootNode.getAttribute("b"), null)
    assert.equal(newRootNode.getAttribute("c"), null)
    assert.end()
})