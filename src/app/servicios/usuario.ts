import { UsuarioLogin } from "./usuarioLogin";

export class Usuario
{
    idusuario: number = -1;
    nombre: string = "";
    password: string = "";
    admin: number = 0;
    foto: string = "";

    static fromLoginUsuario(usuarioLogin: UsuarioLogin): Usuario
    {
        let usutemp = new Usuario();
        usutemp.nombre = usuarioLogin.nombre;
        usutemp.password = usuarioLogin.password;
        return usutemp;
    }
}

