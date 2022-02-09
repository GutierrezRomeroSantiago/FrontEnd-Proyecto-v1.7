import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/usuario';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  usuarios: Array<User> = [];
  usuariosApi: any;
  form: FormGroup
  router: any;

  constructor( private toastr: ToastrService, private loginService: LoginService, private fb: FormBuilder ) { 
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  getUser() {
    this.loginService.getUsers().subscribe(usuarios => {
    this.usuariosApi = usuarios;

    for (let us of this.usuariosApi) {
      let p = new User(
        us._id,
        us._usuario,
        us._password,
      )
      this.usuarios.push(p)
    }
    })
  }

  eliminarUsuario(usuario: any) {
    this.loginService.eliminarUsuario(usuario).subscribe(data => {
      this.getUser();
      this.toastr.success('Usuario Eliminado', 'Ya no podra iniciar sesion con este usuario');
      this.router.navigate(['/user'])
    })
  }

  addUser(
    _usuario: string,
    _password: string,
  ) {
   const doc: any = {
    _usuario: _usuario,
    _password: _password,
   }

   this.loginService.addUsuario(doc).subscribe( a => {
     this.usuariosApi = doc;
     this.usuarios.push(this.usuariosApi);
   });
  }

  ngOnInit(): void {
    this.getUser();
  }

}
