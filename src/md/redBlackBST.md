## 红黑树二叉搜索树

上文中2-3树可以实现树的**有序性**与**平衡性**,但是要维护两种不同类型的节点(2-节点与**3-节点**),将被查找的键和结点中的每个键
进行比较，将链接和其他信息从一种结点复制到另一种结点，将结点从一种数据类型转换到
另一种数据类型，等等。实现这些不仅需要大量的代码，而且它们所产生的额外开销可能会
使算法比标准的二叉查找树更慢.

### 替换3-节点

红黑二叉查找树背后的基本思想是用标准的二叉查找树（完全由 2- 结点构成）和一些额外的
信息（替换 3- 结点）来表示 2-3 树.树的链接分为两种: **红链接**将两个 2- 结点
连接起来构成一个 3- 结点;**黑链接**则是 2-3 树中的普通链接。 

![红链接相连的两个2节点表示3节点](assets/红链接相连的两个2节点表示3节点.png)

### 定义

红黑树是含有红黑链接并满足下列条件的二叉查找树：

- 红链接均为左链接；
- 没有任何一个结点同时和两条红链接相连；
- 该树是完美黑色平衡的，即任意空链接到根结点的路径上的黑链接数量相同。

满足这样定义的红黑树和相应的 2-3 树是一一对应的


![红链接画平变成2-3树](assets/红链接画平变成2-3树.png)


### 节点表示

每个结点都只会有一条指向自己的链接（从它的父结点指向它）, 我们将节点颜色保存在Node这个对象中,且当我们提到一个结点的颜色时，我们指的是指向
该结点的链接的颜色

```java

private static final boolean RED = true;
private static final boolean BLACK = false;

private class Node {
    Key key;                 //键
    Value val;               //值
    Node left, right;      //左右链接
    int N;                      //这颗子树中的结点总数
    boolean color;       //由父结点指向它的链接的颜色

    public Node(Key key, Value val, int N, boolean color) {
        this.key = key;
        this.val = val;
        this.N = N;
        this.color = color;
    } 
}

private boolean isRed(Node x) {
    if (x == null) return false;
    return x.color == RED;
}

```

每次插入的节点的时候都将节点的颜色初始化为红色

### 旋转

在我们实现的某些操作中(比如插入)可能会出现红色右链接或者两条连续的红链接,
需要通过**旋转**和**变换颜色**修复,
旋转操作会改变红链接的指向, 

#### 左旋转
![红黑树左旋转](assets/红黑树左旋转.png)

#### 右旋转
![红黑树右旋转](assets/红黑树右旋转.png)

无论是rotateRight()或rotateLeft() , 我们总是将其返回值重置父结点（或是根结点),且保留原来父节点的颜色(将 x.color 设为 h.color)

### 颜色变换

当我们的节点经过左右旋转时,有可能出现左右节点均为红色的场景,此时,我们需要颜色变换.

我们专门用一个方法 **flipColors()** 来转换一个结点的两个红色子结点
的颜色。除了将子结点的颜色由红变黑之外，我们同时还要将**父结点的颜色由黑变红**(相当于父节点上浮,和它的父节点结合成为一个3-节点),这项
操作和旋转操作一样是局部变换，不会影响整棵树的黑色平衡性.

![红黑树颜色变换](assets/红黑树颜色变换.png)



### 红黑树的链接向上传递

只要谨慎地使用左旋转、右旋转和颜色转换这三种简单的操作, 在沿着插入点到根结点的路径向上移动时在所经过
的每个结点中顺序完成以下操作，我们就能完成插入操作：

- 如果右子结点是红色的而左子结点是黑色的，进行左旋转；
- 如果左子结点是红色的且它的左子结点也是红色的，进行右旋转；
- 如果左右子结点均为红色，进行颜色转换。

注意,红黑树的根节点为黑色!

### 实现插入

```java
public class RedBlackBST<Key extends Comparable<Key>, Value>
{
  private Node root;
  private class Node // 含有color变量的Node对象（请见3.3.2.4节）
  private boolean isRed(Node h) // 请见3.3.2.4节
  private Node rotateLeft(Node h) // 请见图3.3.16
  private Node rotateRight(Node h) // 请见图3.3.17
  private void flipColors(Node h) // 请见图3.3.21
  private int size() // 请见算法3.3
  public void put(Key key, Value val)
  { // 查找key，找到则更新其值，否则为它新建一个结点
  root = put(root, key, val);
  root.color = BLACK;
  }
  private Node put(Node h, Key key, Value val)
  {
    if (h == null) // 标准的插入操作，和父结点用红链接相连
    return new Node(key, val, 1, RED);
    int cmp = key.compareTo(h.key);
    if (cmp < 0) h.left = put(h.left, key, val);
    else if (cmp > 0) h.right = put(h.right, key, val);
    else h.val = val;
    if (isRed(h.right) && !isRed(h.left)) h = rotateLeft(h);
    if (isRed(h.left) && isRed(h.left.left)) h = rotateRight(h);
    if (isRed(h.left) && isRed(h.right)) flipColors(h);
    h.N = size(h.left) + size(h.right) + 1;
    return h;
  }
}

```








