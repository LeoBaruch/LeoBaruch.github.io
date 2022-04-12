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



