<script>
import { defineComponent, h } from 'vue'
export default defineComponent({
  name: 'Common',
  render() {
   const ok = false
   return h('div',[ok.value ? h('div', 'yes') : h('span', 'no')])
  }
})
</script>