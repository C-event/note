<template>
  <div>
    <!--  list-type 是上传组件的类型 -->
    <!--  limit 是限制上传个数 -->
    <!--  action 是上传的地址  -->
    <!--  auto-upload 是否自动上传，默认为true -->
    <!-- file-list 上传文件的列表，一般用于回显图片内容  并不是双向绑定的！ 加 和 删 都不会自己改变 -->
    <!-- on-preview 钩子函数，是否可以预览，一旦配置就会出现加号 -->
    <!-- on-remove 钩子函数， 表示删除图标点击的时候会触发！ -->
    <!-- on-change 钩子函数， 添加文件、上传文件、上传失败时候 -->
    <!-- before-upload 钩子函数， 上传之前，如果返回false或者Promise的reject则挺着上传，true为可以上传 -->
    <!-- http-request 钩子函数， 自定义上传事件函数，赋给默认上传逻辑 -->
    <el-upload
      list-type="picture-card"
      action="#"
      :limit="1"
      :file-list="fileList"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :class="{ disabled:fileComputed }"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 进度条 -->
    <el-progress v-if="showPercent" style="width: 180px" :percentage="percent" />

    <!-- 预览弹框 -->
    <el-dialog
      title="图片"
      :visible.sync="showDialog"
      width="40%"
    >
      <img style="width:100%" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5'
// 实例化一个 腾讯云cos实例
var cos = new COS({
  SecretId: 'AKID1we5F9m9E3cuvf9MIxMVNyd2A0Zsuf9N', // 身份识别 ID
  SecretKey: 'yf5GBqDJBoBH7h01mGTP4SaR1JOCj060' // 身份密钥
})
export default {
  name: 'ImageUpload',
  data() {
    return {
      // [{ name:'',url:'' },{}]
      fileList: [],
      showDialog: false, // 预览弹框打开
      imgUrl: '', // 预览图片地址
      currentFileUid: '',
      showPercent: false,
      percent: 0
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    // 图片预览事件
    onPreview(file) {
      // console.log(file) // 点击要预览的图片的信息
      this.imgUrl = file.url
      this.showDialog = true
    },
    // 图片删除事件
    onRemove(file, fileList) {
      // console.log(file)  // 删除的那个元素
      // console.log(fileList)  // 删除后的 fileList
      // 推荐手动去删除 this.fileList 里面的内容，而不是将fileList直接赋给 this.fileList
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    // 文件发送变化的时候
    onChange(file, fileList) {
      // console.log(file)  // file.url  还是一个用JS生成的blob预览地址
      // console.log(fileList)   // 最新的文件列表
      // 需要等到上传成功、上传失败、选择文件的时候
      this.fileList = fileList.map(item => item)
    },
    // 上传之前的钩子
    beforeUpload(file) {
      // 类型校验
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.warning('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      // 大小校验
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.warning('上传图片不能超过5M')
        return false
      }
      //   已经确定当前上传的就是当前的这个file了
      this.currentFileUid = file.uid // 【新增】
      this.showPercent = true
      // 通过
      return true
    },
    // 上传事件
    upload({ file }) {
      // console.log(file)  // 需要上传的文件信息
      // 不使用 腾讯云COS 我们就需要在这里自己执行上传事件逻辑！找到上传接口，提交文件给上传接口完成上传
      // 使用 腾讯云COS
      if (file) {
        // cos.putObject({配置对象},回调函数)
        cos.putObject({
          Bucket: 'hewu-4455-1300525194', // 存储桶
          Region: 'ap-nanjing', // 地域
          Key: file.name, // 文件名
          Body: file, // 要上传的文件对象
          StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
          // 进度条
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          // 简单做法： 将 data.Location 赋给表单的图片存储字段变量即可！

          // data返回数据之后 应该如何处理
          if (!err && data.statusCode === 200) {
            // 将真实的地址去fileList里面替换本地生成的预览地址
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
            setTimeout(() => {
              this.showPercent = false // 隐藏进度条
              this.percent = 0 // 进度归0
            }, 2000)
          }
        })
      }
    }
  }
}
</script>
<style  lang='scss' scoped>
// 一旦 style加了 scoped 属性，就无法直接穿透修改组件内部的样式，需要使用deep
// 但是  scss 不支持  /deep/   需要使用 ::v-deep
::v-deep .disabled .el-upload--picture-card{
  display: none;
}
</style>
