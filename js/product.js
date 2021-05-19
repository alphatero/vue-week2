const url = 'https://vue3-course-api.hexschool.io/api';
const path = 'alphatest';
const app = {
  data: {
    products: [],
  },
  getData(page = 1) {
    const api = `${url}/${path}/products?page=${page}`;
    axios.get(api).then((res) => {
      if (res.data.success) {
        this.data.products = res.data.products;
        console.log(this.data.products)
        this.render();
      }
    })
  },
  render () {
    const productList = document.querySelector('#productList');
    // let temp = '';
    // this.data.products.forEach ((item) => {
    //   temp = temp + `
    //   <tr>
    //     <td>${item.title}</td>
    //   <td width="120">
    //     ${item.origin_price}
    //   </td>
    //   <td width="120">
    //     ${item.price}
    //   </td>
    //   <td width="100">
    //     <span class="${item.is_enabled ? 'text-success' : 'text-secondary'}">${item.is_enabled ? '啟用' : '未啟用'}</span>
    //   </td>
    //   <td width="120">
    //     <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
    //   </td>
    //     </tr>
    //   `;
    // });
    const temp = this.data.products.map(item =>`
      <tr>
        <td>${item.title}</td>
      <td width="120">
        ${item.origin_price}
      </td>
      <td width="120">
        ${item.price}
      </td>
      <td width="100">
        <span class="${item.is_enabled ? 'text-success' : 'text-secondary'}">${item.is_enabled ? '啟用' : '未啟用'}</span>
      </td>
      <td width="120">
        <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
      </td>
        </tr>
    `).join('');
    // console.log(temp);
    productList.innerHTML = temp;
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', this.deleteProduct);
    })
  },
  deleteProduct (e) {
    const id = e.target.dataset.id;
    console.log(id);
    axios.delete(`${url}/${path}/admin/product/${id}`).then(
      res => {
        console.log(res);
        app.getData();
      }
    )
  },
  init() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    // console.log(token)
    // axios.post(`${url}/user/check`).then(res => {
    //   console.log(res)
    // })

    this.getData();
  }
}
app.init();