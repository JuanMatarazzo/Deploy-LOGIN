import React from 'react'

function asdapp() {
  return (
    <div class="min-h-screen bg-background text-foreground">
    <header class="bg-card text-card-foreground p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Bienvenido admin</h1>
      <button class="bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-secondary/80">Logout</button>
    </header>

    
    <main class="p-4 space-y-4">
      <div class="bg-card text-card-foreground rounded-lg shadow p-4 flex flex-col md:flex-row items-center">
        <img class="w-24 h-24 rounded-full mr-4" src="https://placehold.co/100x100.png?text=User+1&bg=cccccc" alt="User Image" />
        <div class="flex-1">
          <h2 class="text-lg font-semibold">John Doe</h2>
          <p>Email: johndoe@example.com</p>
          <p>Gender: Male</p>
          <p>Age: 30</p>
        </div>
      </div>
  
      <div class="bg-card text-card-foreground rounded-lg shadow p-4 flex flex-col md:flex-row items-center">
        <img class="w-24 h-24 rounded-full mr-4" src="https://placehold.co/100x100.png?text=User+2&bg=cccccc" alt="User Image" />
        <div class="flex-1">
          <h2 class="text-lg font-semibold">Jane Smith</h2>
          <p>Email: janesmith@example.com</p>
          <p>Gender: Female</p>
          <p>Age: 28</p>
        </div>
      </div>
    </main>
  </div>
  )
}

export default asdapp