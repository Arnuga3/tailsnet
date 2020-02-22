# Advanced Avatar Editor API

### Supports two modes: Original (Using internal action buttons) and Flexible (Handling actions externally)

| Property       |Description   |
|----------------|--------------|
|dispatch        |Redux `dispatch` method. Required for the internal `save` action button.
|onSave          |A redux action that is getting dispatched using `dispatch` property. A FormData object is getting passed to the action with `avatarImage`, scaled to canvas image blob key value pair. Used in combination with internal `save` action button.
|onSaveEnd       |Invoked after internal `save` action.
|onEdit          |Action that is getting invoked when avatar editor is in preview state and internal `edit` button is clicked.
|onCancel        |Invoked after internal `cancel` action button click.
|onChange        |Invoked before avatar component unmount and returns `imgState` object that contains scaled image blob and image state properties (rotate, zoom, position(x,y))
|actionButtons   |Boolean to disable internal action buttons. Default value is `true`.
|label           |Label is used to display first two capital characters if image is `null`.
|image           |Image as per react-avatar-editor docs.
|onImageSelected |Invoked when image selected from the machine. Returns selected image.
|isPreview       |Boolean to trigger avatar's preview/edit modes.