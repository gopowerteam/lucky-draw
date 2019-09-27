import AV from 'leancloud-storage'
import faker from 'faker'
import store from '~/store'
import { ConversationBase } from 'leancloud-realtime'

const User = AV.Object.extend('user')

export class UserService {
  /**
   * 用户登录
   * @param param
   */
  public login({ username }) {
    const avatar = faker.image.avatar()
    const user = new User()
    user.set('username', username)
    user.set('avatar', avatar)

    return user.save().then(() => {
      store.commit('setUser', {
        username,
        avatar
      })
    })
  }

  /**
   * 获取会话用户信息
   * @param conversation
   */
  public getUserList(conversation: ConversationBase) {
    const query = new AV.Query('user')
    return query.containedIn('username', conversation.members).find()
  }
}
