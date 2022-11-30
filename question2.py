from typing import Dict, List, Optional


class Node:

    # the name of the HTML tag represented in this node
    tagName: Optional[str]
    # the text within this HTML tag
    text: Optional[str]
    # the list of nodes immediately within (children of) this HTML tag
    children: List['Node']
    # dictionary of (key, value) pairs of attributes in this HTML tag
    attributeMap: Dict[str, str]
    # parent node for this HTML tag
    parent: Optional['Node']

    def __init__(self, tagName: Optional[str], text: Optional[str], children: List['Node'], attributeMap: Dict[str, str], parent: Optional['Node']) -> None:
        self.tagName = tagName
        self.text = text
        self.children = children
        self.attributeMap = attributeMap
        self.parent = parent


def parse_html(html: str) -> Node:

    if html[0] != "<":
        return Node(None, html, [], {}, None)

    i = 1
    while html[i] != " " and html[i] != ">":
        i += 1
    tagName: str = html[1:i]
    attributeMap: Dict[str, str] = {}
    if html[i] == " ":
        j = i + 1
        while html[j] != ">":
            j += 1
        attributes: str = html[i + 1:j]
        attributeMap = {}
        i = j + 1
    else:
        i += 1

    children: List[Node] = []
    while html[i] != "<" or html[i + 1] != "/":
        children.append(parse_html(html[i:]))
        i += len(children[-1].text)
    i += len(tagName) + 3

    return Node(tagName, None, children, attributeMap, None)


if __name__ == '__main__':
    html: str = "<html lang=\"en\" ><head><meta charset=\"utf-8\"><title>My Page</title></head><body><h1>My Page</h1><p>This is my page.</p></body></html>"
    root: Node = parse_html(html)
    print(root.parent)
    print(root.tagName)
