<template>
  <div class="vc-chrome">
    <div class="vc-chrome-saturation-wrap">
      <saturation v-model="colors" @change="childChange"></saturation>
    </div>
    <div class="vc-chrome-body">
      <div class="vc-chrome-controls">
        <div class="vc-chrome-color-wrap">
          <div class="vc-chrome-active-color" :style="{background: activeColor}"></div>
          <checkboard></checkboard>
        </div>

        <div class="vc-chrome-sliders">
          <div class="vc-chrome-hue-wrap">
            <hue v-model="colors" @change="childChange"></hue>
          </div>
          <div class="vc-chrome-alpha-wrap">
            <alpha v-model="colors" @change="childChange"></alpha>
          </div>
        </div>
      </div>

      <div class="vc-chrome-fields-wrap">
        <div class="vc-chrome-fields" v-show="fieldsIndex === 0">
          <!-- hex -->
          <div class="vc-chrome-field">
            <ed-in label="hex" :value="colors.hex" @change="inputChange"></ed-in>  
          </div>
        </div>
        <div class="vc-chrome-fields" v-show="fieldsIndex === 1">
          <!-- rgba -->
          <div class="vc-chrome-field">
            <ed-in label="r" :value="colors.rgba.r" @change="inputChange"></ed-in>
          </div>
          <div class="vc-chrome-field">
            <ed-in label="g" :value="colors.rgba.g" @change="inputChange"></ed-in>
          </div>
          <div class="vc-chrome-field">
            <ed-in label="b" :value="colors.rgba.b" @change="inputChange"></ed-in>
          </div>
          <div class="vc-chrome-field">
            <ed-in label="a" :value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></ed-in>
          </div>
        </div>
        <!-- btn -->
        <!-- <div class="vc-chrome-toggle-btn" @click="toggleViews" v-if="fieldsIn">
          <div class="vc-chrome-toggle-icon">
            <svg style="width:24px; height:24px" viewBox="0 0 24 24" 
              @mouseover="showHighlight" 
              @mouseenter="showHighlight" 
              @mouseout="hideHighlight">
              <path fill="#333" d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" />
            </svg>
          </div>
          <div class="vc-chrome-toggle-icon-highlight" v-show="highlight"></div>
        </div> -->
        <!-- btn -->
      </div>
    </div>
  </div>
</template>

<script>
import colorMixin from './mixin/color'
import editableInput from './common/EditableInput.vue'
import saturation from './common/Saturation.vue'
import hue from './common/Hue.vue'
import alpha from './common/Alpha.vue'
import checkboard from './common/Checkboard.vue'

export default {
  name: 'Chrome',
  mixins: [colorMixin],
  components: {
    saturation,
    hue,
    alpha,
    'ed-in': editableInput,
    checkboard
  },
  props: ['fieldsIndex'],
  data () {
    return {
      fields: ['hex', 'rgba'],
      highlight: false
    }
  },
  computed: {
    activeColor () {
      var rgba = this.colors.rgba
      return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')'
    }
  },
  methods: {
    handlePreset (c) {
      this.colorChange({
        hex: c,
        source: 'hex'
      })
    },
    childChange (data) {
      this.colorChange(data)
    },
    inputChange (data) {
      if (!data) {
        return
      }
      if (data.hex) {
        this.isValidHex(data.hex) && this.colorChange({
          hex: data.hex,
          source: 'hex'
        })
      } else if (data.r || data.g || data.b || data.a) {
        this.colorChange({
          r: data.r || this.colors.rgba.r,
          g: data.g || this.colors.rgba.g,
          b: data.b || this.colors.rgba.b,
          a: data.a || this.colors.rgba.a,
          source: 'rgba'
        })
      }
    },
    toggleViews () {
      if (this.fieldsIndex >= 1) {
        this.fieldsIndex = 0
        return
      }
      this.fieldsIndex ++
    },
    showHighlight () {
      this.highlight = true
    },
    hideHighlight () {
      this.highlight = false
    }
  },
  mounted () {
    this.parentDom = this.$root.$el;
    // this.$nextTick(() => {
    //   this.parentDom.appendChild(this.$el);
    // });
  }
}
</script>

<style>
.vc-chrome {
  margin-top: 5px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: inset 0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3);
  box-sizing: initial;
  /*width: 200px;*/
  width: 100%;
  font-family: Menlo;
  background-color: #fff;
}
.vc-chrome-controls {
  display: flex;
}
.vc-chrome-color-wrap {
  position: relative;
  width: 36px;
}
.vc-chrome-active-color {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  z-index: 1;
}
.vc-chrome-color-wrap .vc-checkerboard {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-size: auto;
}
.vc-chrome-sliders {
  flex: 1;
}
.vc-chrome-fields-wrap {
  display: flex;
  padding-top: 16px;
}
.vc-chrome-fields {
  display: flex;
  margin-left: -6px;
  flex: 1;
}
.vc-chrome-field {
  padding-left: 6px;
  width: 100%;
}
.vc-chrome-toggle-btn {
  width: 32px;
  text-align: right;
  position: relative;
}
.vc-chrome-toggle-icon {
  margin-right: -4px;
  margin-top: 12px;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
.vc-chrome-toggle-icon-highlight {
  position: absolute;
  width: 24px;
  height: 28px;
  background: #eee;
  border-radius: 4px;
  top: 10px;
  left: 12px;
}
.vc-chrome-hue-wrap {
  position: relative;
  height: 10px;
  margin-bottom: 8px;
}
.vc-chrome-alpha-wrap {
  position: relative;
  height: 10px;
}
.vc-chrome-hue-wrap .vc-hue {
  border-radius: 2px;
}
.vc-chrome-alpha-wrap .vc-alpha-gradient {
  border-radius: 2px;
}
.vc-chrome-hue-wrap .vc-hue-picker, .vc-chrome-alpha-wrap .vc-alpha-picker {
  width: 12px;
  height: 12px;
  border-radius: 6px;
  transform: translate(-6px, -2px);
  background-color: rgb(248, 248, 248);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
}
.vc-chrome-body {
  padding: 16px 16px 12px;
  background-color: #fff;
}
.vc-chrome-saturation-wrap {
  width: 100%;
  padding-bottom: 55%;
  position: relative;
  border-radius: 2px 2px 0 0;
  overflow: hidden;
}
.vc-chrome-saturation-wrap .vc-saturation-circle {
  width: 12px;
  height: 12px;
}

.vc-chrome-fields .vc-input__input {
  font-size: 11px;
  color: #333;
  width: 100%;
  border-radius: 2px;
  border: none;
  box-shadow: inset 0 0 0 1px #dadada;
  height: 21px;
  text-align: center;
}
.vc-chrome-fields .vc-input__label {
  text-transform: uppercase;
  font-size: 11px;
  line-height: 11px;
  color: #969696;
  text-align: center;
  display: block;
  margin-top: 12px;
}
</style>
