## 二叉搜索树

### 定义

一颗二叉查找树（BST）是一颗二叉树，其中每个结点都含有一个Comparable的键（以及相关的值）且每个结点的键都大于其左子树的任意结点的键而小于右子树的任意结点的键.

每一个二叉搜索树的左右子树也都是一个二叉搜索树

二叉搜索树如果用中序遍历一下，就是一个从大到小的序列

### 二叉查找树的建立

```java

public class BST<Key extends Comparable<Key>, Value>
{
   private Node root;               // 二叉查找树的根结点

   private class Node
   {
      private Key key;              // 键
      private Value val;            // 值
      private Node left, right;     // 指向子树的链接
      private int N;                // 以该结点为根的子树中的结点总数

      public Node(Key key, Value val, int N)
      {  this.key = key; this.val = val; this.N = N; }
   }

   public int size()
   {  return size(root);  }

   private int size(Node x)
   {
      if (x == null) return 0;
      else           return x.N;
   }

   public Value get(Key key)
   // 请见算法3.3（续1）

   public void put(Key key, Value val)
   // 请见算法3.3（续1）

   // max()、min()、floor()、ceiling()方法请见算法3.3（续2）
   // select()、rank()方法请见算法3.3（续3）
   // delete()、deleteMin()、deleteMax()方法请见算法3.3（续4）
   // keys()方法请见算法3.3（续5）
}

```

### 算法 3.3（续 1）二叉查找树的查找和赋值

```java 

/*查找*/
public Value get(Key key)
{  return get(root, key);  }
private Value get(Node x, Key key)
{  // 在以x为根结点的子树中查找并返回key所对应的值；
   // 如果找不到则返回null
   if (x == null) return null;
   int cmp = key.compareTo(x.key);
   if      (cmp < 0) return get(x.left, key);
   else if (cmp > 0) return get(x.right, key);
   else return x.val;
}
/*赋值*/
public void put(Key key, Value val)
{  // 查找key，找到则更新它的值，否则为它创建一个新的结点
   root = put(root, key, val);
}

private Node put(Node x, Key key, Value val)
{
   // 如果key存在于以x为根结点的子树中则更新它的值；
   // 否则将以key和val为键值对的新结点插入到该子树中
   if (x == null) return new Node(key, val, 1);
   int cmp = key.compareTo(x.key);
   if      (cmp < 0) x.left  = put(x.left,  key, val);
   else if (cmp > 0) x.right = put(x.right, key, val);
   else x.val = val;
   x.N = size(x.left) + size(x.right) + 1;
   return x;
}

```

### 分析二叉查找树查找节点的时间复杂度(节点数为N)

最差情况下,二叉查找树退化成链表,树高等于节点也为N

理想情况下,一颗含有N个节点的二叉查找树是完全平衡的,他的树高为 **lgN**

二叉查找树的查找的平均时间复杂度为~2InN,约为**1.39lgN**,比二分查找的成本高约**39%**


### 最大键最小键 及 向上取整和向下取整

#### 最大键最小键

如果根节点左链接为空为空,则一颗二叉查找树的最小节点是根节点.如果左子树非空,那么树中最小键也是左子树的最小键.

最大键相反


#### 向上取整和向下取整

如果给定的键key小于二叉查找树根节点,那么**小于等于**key的最大键**floor(key)**一定在根节点的左子树中;如果给定的键key大于二叉查找树的根节点,只有当根节点的右节点存在小于等于key的节点,小于等于key的最大键才会存在于右子树中,否则根节点就是小于等于key的最大键

```java

public Key min()
{
   return min(root).key;
}
private Node min(Node x)
{
   if (x.left == null) return x;
   return min(x.left);
}
public Key floor(Key key)
{
   Node x = floor(root, key);
   if (x == null) return null;
   return x.key;
}
private Node floor(Node x, Key key)
{
   if (x == null) return null;
   int cmp = key.compareTo(x.key);
   if (cmp == 0) return x;
   if (cmp < 0)  return floor(x.left, key);
   Node t = floor(x.right, key);
   if (t != null) return t;
   else           return x;
}

```

### 排名

#### select()

假设我们想找到排名为  的键（即树中正好有  个小于它的键）。如果左子树中的结点数  大于 ，那么我们就继续（递归地）在左子树中查找排名为  的键；如果  等于 ，我们就返回根结点中的键；如果  小于 ，我们就（递归地）在右子树中查找排名为（）的键。

#### rank()

rank() 是 select() 的逆方法，它会返回给定键的排名。它的实现和 select() 类似：如果给定的键和根结点的键相等，我们返回左子树中的结点总数 ；如果给定的键小于根结点，我们会返回该键在左子树中的排名（递归计算）；如果给定的键大于根结点，我们会返回 （根结点）加上它在右子树中的排名（递归计算）

```java

public Key select(int k)
{
   return select(root, k).key;
}
private Node select(Node x, int k)
{   // 返回排名为k的结点
    if (x == null) return null;
    int t = size(x.left);
    if      (t > k) return select(x.left,  k);
    else if (t < k) return select(x.right, k-t-1);
    else            return x;
}
public int rank(Key key)
{  return rank(key, root);  }
private int rank(Key key, Node x)
{  // 返回以x为根结点的子树中小于x.key的键的数量
   if (x == null) return 0;
   int cmp = key.compareTo(x.key);
   if      (cmp < 0) return rank(key, x.left);
   else if (cmp > 0) return 1 + size(x.left) + rank(key, x.right);
   else              return size(x.left);
}

```

### 删除delete()

#### 删除最大最小键

二叉查找树中最难实现的方法就是 **delete()** 方法，即从符号表中删除一个键值对”, 在此之前我们先考虑 **deleteMin()** 方法

和 put() 一样，我们的递归方法接受一个指向结点的链接，并返回一个指向结点的链接。这样我们就能够方便地改变树的结构，将返回的链接赋给作为参数的链接。对于 deleteMin()，我们要不断深入根结点的左子树中直至遇见一个空链接，然后将指向该结点的链接指向该结点的右子树（只需要在递归调用中返回它的右链接即可）。此时已经没有任何链接指向要被删除的结点，因此它会被垃圾收集器清理掉. deleteMax() 方法的实现和 deleteMin() 完全类似。

#### 删除操作

我们可以用类似的方式删除任意只有一个子结点（或者没有子结点）的结点，但应该怎样删除一个拥有两个子结点的结点呢？

删除之后我们要处理两棵子树，但被删除结点的父结点只有一条空出来的链接。T. Hibbard 在 1962 年提出了解决这个难题的第一个方法，在删除结点 x 后用它的后继结点填补它的位置。因为 x 有一个右子结点，因此它的后继结点就是其右子树中的最小结点。这样的替换仍然能够保证树的有序性，因为 x.key 和它的后继结点的键之间不存在其他的键

```java

public void deleteMin()
{
   root = deleteMin(root);
}

private Node deleteMin(Node x)
{
   if (x.left == null) return x.right;
   x.left = deleteMin(x.left);
   x.N = size(x.left) + size(x.right) + 1;
   return x;
   }

public void delete(Key key)
{  root = delete(root, key);  }

private Node delete(Node x, Key key)
{
   if (x == null) return null;
   int cmp = key.compareTo(x.key);
   if      (cmp < 0) x.left  = delete(x.left,  key);
   else if (cmp > 0) x.right = delete(x.right, key);
   else
   {
      if (x.right == null) return x.left;
      if (x.left == null) return x.right;
      Node t = x;
      x = min(t.right);  // 请见算法3.3（续2）
      x.right = deleteMin(t.right);
      x.left = t.left;
   }
   x.N = size(x.left) + size(x.right) + 1;
   return x;
}

```
























