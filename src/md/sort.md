## 排序

### 归并排序

归并排序的性能不受输入数据的影响,为稳定排序算法, 速度仅次于快速排序.

#### 思想

采用分治法Divide and Conquer）, 分治模式在每一层递归上有三个步骤:

- 分解（Divide）：将n个元素分成个含n/2个元素的子序列。
- 解决（Conquer）：用合并排序法对两个子序列递归的排序。
- 合并（Combine）：合并两个已排序的子序列已得到排序结果。

#### 实现逻辑(算法第四版 2.2.1):

先将所有元素复制到aux[], 然后再归并到a[]中. 在归并时,进行4个条件判断: 

- 左半边用尽(取右半边元素), 

- 右半边用尽(取右半边元素),

- 右半边当前元素小于左半边当前元素(取右半边元素),

- 右半边当前元素小于等于左半边元素(取左半边元素)

```ts

function merge(a: Comparable[], lo: number, mid: number, hi: number) {
  let i = lo; let j = mid + 1;

  const aux: Comparable[] = Array.from(a);

  for(let k = lo; k <= hi; k++) {
    if(i > mid) a[k] = aux[j++];
    else if( j > hi) a[k] = aux[i++];
    else if(less(aux[j], aux[i])) a[k] = aux[j++];
    else a[k] = a[i++];
  }
}

```

##### 递归法(2.2.2)

```ts

function mergeSort(arr: Comparable[]) {
  const aux: Comparable[] = [];

  function sort(array: Comparable[], lo: number, hi: number) {
    if(hi <= lo) return;
    const mid: number = lo + (hi - lo) / 2;

    sort(array, lo, mid);
    sort(array, mid + 1, hi);

    merge(array, lo, mid , hi);
  }

  sort(arr, 0 , arr.length - 1);

  return arr;
}

```

##### 迭代法(2.2.3)


```ts

function mergeSort(arr: Comparable[]) {
  const { length } = arr;
  const aux: Comparable[] = [];

  for(let sz = 1; sz < length; sz += sz + sz) { // sz 子数组大小
    for(let lo = 0; lo < length - sz; lo += sz + sz) { // 子数组索引
      merge(arr, lo, lo + sz - 1, Math.min(lo + sz + sz - 1, length -1))
    }
  }

}

```

不管元素在什么情况下都要做这些步骤，所以花销的时间是不变的，所以该算法的最优时间复杂度和最差时间复杂度及平均时间复杂度都是一样的为：O( nlogn )

空间复杂度为: O(n)。


### 快速排序

快速排序的基本思想是：通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据比另一部分的所有数据要小，再按这种方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，使整个数据变成有序序列。


```ts

  function quickSort(arr: Comparable[]) {
    sort(arr, 0, arr.lenght - 1);

    function sort(array: Comparable[], lo, hi) {
      if(hi <= lo) return;

      let j = partition(array, lo, hi); // 切分

      sort(array, lo, j - 1);
      sort(array, j + 1, hi);
    }

    function partition(array: Comparable[], lo , hi) {
      let i = lo; let j = hi + 1;

      const v = array[lo];

      while(true) {
        while(less(array[++i], v)) if(i == hi) break;
        while(less(v, arry[--j])) if(j == lo) break;

        if(j <= i ) break;
        exch(array, i, j);
      }

      exch(array, lo, j);

      return j;

    }
  }

```

快速排序的平均时间复杂度是 O(nlogn), 但是快速排序在最坏情况下的时间复杂度和冒泡排序一样，是 O(n2) **(即已经排序好的数组))** , 所以开始可以先打乱数组的顺序保持随机性.而且对于小数组,其实快速排序比插入排序慢;所以可以混合使用;

快速排序只是使用数组原本的空间进行排序; 

快速排序是一个不稳定的算法，在经过排序之后，可能会对相同值的元素的相对位置造成改变。

快速排序基本上被认为是相同数量级的所有排序算法中，平均性能最好的。

### 堆排序

```java
public static void sort(Comparable[] a)
{
   int N = a.length;
   for (int k = N/2; k >= 1; k--)
      sink(a, k, N);
   while (N > 1)
   {
      exch(a, 1, N--);
      sink(a, 1, N);
   }
}
```

以上代码中,第一个循环,构造了一个二叉堆, 第二个循环,依次将堆顶元素和最后一个元素交换,并通过缩小数组N的值来弹出原堆顶 **(最值)** 缩小堆的大小.

在前面文章 **(优先队列)** 里介绍过的,由数组构造的二叉堆中,父节点位置为**k**时,子节点分别为**2k**和**2k+1**,所以从 **N/2**的位置找到最大的父节点,并依次**sink**操作(sink操作见优先队列),从而达到堆有序.

如下图:

![堆排序]('../assets/堆排序.png')




