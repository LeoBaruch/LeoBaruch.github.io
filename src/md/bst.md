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




