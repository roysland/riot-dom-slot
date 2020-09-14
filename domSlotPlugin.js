import { install } from 'riot'
install((component) => {
    const {onBeforeMount} = component

    component.onBeforeMount = (...args) => {
      const html = component.root.innerHTML
      
      if (html) {
        component.root.innerHTML = ''
        Object.defineProperty(component, 'slots', {
          value: [ 
            ...(component.slots || []), 
            ...[{ id: 'default', html }]
          ],
          enumerable: false,
          writable: false,
          configurable: true,
        })
      }
      onBeforeMount.apply(component, ...args)
    }
    
    return component
  })
