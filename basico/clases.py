class Biblioteca:
    def __init__(self,Titulo, Autor):
        self.Titulo = Titulo
        self.Autor = Autor
        self.prestado = False
    
    def prestar(self):
        if self.prestado:
            print(f"El libro '{self.Titulo}' ya está prestado.")
        else:
            self.prestado = True
            print(f"El libro '{self.Titulo}' ha sido prestado.")

    def devolver(self):
        if not self.prestado:
            print(f"El libro '{self.Titulo}' no estaba prestado.")
        else:
            self.prestado = False
            print(f"El libro '{self.Titulo}' ha sido devuelto.")

bibliote = Biblioteca("Cien Años de Soledad", "Gabriel García Márquez")
bibliote1 = Biblioteca("Don Quijote de la Mancha", "Miguel de Cervantes")
bibliote1.prestar()
bibliote1.prestar()
bibliote1.devolver()
bibliote.devolver()
