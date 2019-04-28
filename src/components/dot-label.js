Vue.component('b-dot-label', {
  render (h) {
    let child = []
    const dot = h('span', {
        class: ['bin-dot'],
        style: {
          display: 'inline-block',
          verticalAlign: 'middle',
          width: this.size,
          height: this.size,
          borderRadius: this.type === 'circle' ? '50%' : '',
          marginRight: '10px',
          backgroundColor: this.color
        }
      }
    )
    const label = h('span', {
        style: {
          display: 'inline-block',
          verticalAlign: 'middle'
        }
      },
      this.$slots.default
    )
    child.push(dot)
    child.push(label)
    return h('span', {
      class: ['bin-dot-wrap'],
      style: {
        padding: '5px 15px',
      }
    }, child)
  },
  props: {
    color: {
      type: String,
      default: '#2d8cf0'
    },
    type: {
      type: String,
      default: 'line'
    },
    size: {
      type: String,
      default: '10px'
    }
  }
})
