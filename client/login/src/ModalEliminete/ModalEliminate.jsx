import React from 'react'


function ModalEliminate({deleteUser, setShowEliminate, showEliminate}) {
  return (
    <div className="fixed inset-0 bg-zinc-600 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-black w-full max-w-md rounded-lg p-6 shadow-lg border-2 border-custom-purple">
        <h2 className="text-lg font-semibold text-card-foreground text-red-700">Eliminar</h2>
        <p className="text-card-foreground mt-4">
          ¿Estás seguro de que quieres eliminar este usuario?
        </p>
        <div className="flex justify-end space-x-4 mt-6">
          <button onClick={deleteUser} className="bg-red-700 bg-destructive text-destructive-foreground px-4 py-2 rounded hover:bg-destructive/80">
            Eliminar
          </button>
          <button onClick={() => setShowEliminate(!showEliminate)}  className="bg-custom-purple bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-secondary/80">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalEliminate
