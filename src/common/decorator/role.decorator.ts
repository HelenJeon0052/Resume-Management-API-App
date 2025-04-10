import { SetMetadata } from "@nestjs/common"
import { Roles } from "src/user/enum/user.enum"




export const ROLES_KEY = 'roles'
export const RolesKey = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles)