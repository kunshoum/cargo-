<template>
  <div class="wrap_line" :style="{width: this.width + 'px'}">
    <div class="fill_line" :style="{width: this.startPos + 'px'}"></div>
    <div class="drag_ball" :style="{left: this.startPos + 'px'}" @mousedown="dragStart"></div>
  </div>
</template>

<script>
  export default {
    props: {
      width: {
        type: Number,
        default: 130,
      },
      ratios: {
        type: Number,
        default: 0.5,
      },
    },
    data() {
      return {
        wrapLeft: '',
        ballPos: '',
        moved: false,
      }
    },

    computed: {
      startPos() {
        if(this.moved) {
          return this.ballPos - this.wrapLeft
        }else {
          return this.width * this.ratios
        }
      }
    },

    mounted() {
      document.onmouseup = function() {
        this.removeEvent()
      }
    },

    beforeDestroy() {
      this.removeEvent()
    },

    methods: {
      addEvent() {
        document.addEventListener('mousemove', this.dragMove)
        document.addEventListener('mouseup', this.dragEnd)
      },
      removeEvent() {
        document.removeEventListener('mousemove', this.dragMove)
        document.removeEventListener('mouseup', this.dragEnd)
      },
      dragStart(evt) {
        this.addEvent()
        let wrap = document.querySelector(".wrap_line")
        this.wrapLeft = wrap.getBoundingClientRect().left
        this.ballPos = evt.clientX
        this.moved = true
      },
      dragMove(evt) {
        evt.preventDefault()
        this.ballPos = evt.clientX
        let dragLen = this.ballPos - this.wrapLeft + 6
        if(dragLen < 0) {
          this.ballPos = this.wrapLeft
        }

        if(dragLen > this.width) {
          this.ballPos = this.wrapLeft + this.width - 6
        }
      },
      dragEnd(evt) {
        this.removeEvent()
      },
    }
  }
</script>

<style lang="less">
  .wrap_line {
    position: relative;
    height: 12px;
    border-radius: 6px;
    background: #d1d0d0;

    .fill_line {
      height: 12px;
      border-radius: 6px;
      background: #f8c023;
    }

    .drag_ball {
      position: absolute;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #fff;
      cursor: pointer;
      z-index: 999;
    }
  }
</style>
