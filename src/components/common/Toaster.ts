import {Position, Toaster as BlueprintToaster} from '@blueprintjs/core'

const Toaster = BlueprintToaster.create({
  position: Position.TOP,
  canEscapeKeyClear: true,
})

export default Toaster
