<template>
  <!--    <div>-->
  <!--      <el-button @click="showDialog=true">打开弹窗</el-button>-->
  <!--      <AccDialog :dialog-visible="showDialog" @dialog-cancel="showDialog=false"></AccDialog>-->
  <!--    </div>-->

  <div>
    <el-button type="text" v-longpress="incrementPlusTen" v-on:onmouseup="incrementPlusOne">点击打开 Dialog</el-button>

    <el-dialog title="请编辑类别名" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item :label-width="formLabelWidth">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <button v-longpress="incrementPlusTen" @click="incrementPlusOne">{{value}}</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AccDialog from "@/components/AccDialog.vue";
import {Component} from "vue-property-decorator";

import longpress from '@/lib/longpress';


@Component({
  components: {AccDialog},
  directives: {
    longpress
  }
})
export default class NotFound extends Vue {
  formLabelWidth = "120px";
  dialogFormVisible = false;

  incrementPlusOne() {
    console.log('我是点击')
  }
  incrementPlusTen() {
    this.dialogFormVisible = true
  }

}
</script>

<style scoped lang="scss">

</style>