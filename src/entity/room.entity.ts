import AV from 'leancloud-storage'
import { Entity } from './'
import { RealtimeUtil } from '@/shared/utils/realtime.util'
import { ConversationBase } from 'leancloud-realtime'
import { RoomService } from '@/services/room.service'
import { AwardService } from '@/services/award.service'
import { Observable } from 'rxjs'

export class RoomEntity extends Entity {
  private realtimeUtil = new RealtimeUtil()
  /**
   * 会话实例
   */
  private _conversation?: ConversationBase

  public getEnable() {
    return this.get('enable')
  }

  /**
   * 启用房间
   */
  public async setEnable() {
    const realtimeUtil = new RealtimeUtil()

    if (this.valid) {
      this._conversation = await realtimeUtil.createConversation(this.attributes.code.toString())
      this.set('conversation', this._conversation.id)
      this.set('enable', true)
      await this.save()
    }
  }

  /**
   * 获取并加入会话
   */
  public async getConversation(): Promise<ConversationBase> {
    if (this._conversation) {
      return this._conversation
    }

    if (this.attributes.enable && this.valid) {
      this._conversation = (await this.realtimeUtil.getConversation(this.attributes.conversation)) as ConversationBase
      return this._conversation
    } else {
      throw new Error('当前会话未启用')
    }
  }

  /**
   * 创建奖
   *
   *
   * @param params
   */
  public createAward(params) {
    const awardService = new AwardService()
    return awardService.create(this.object, params)
  }

  /**
   * 添加消息监听
   */
  public addMessageListener(): Observable<any> {
    if (!this._conversation) {
      return Observable.throw(new Error('会话不存在'))
    }

    return this.realtimeUtil.addUMessageListener(this._conversation)
  }

  /**
   * 添加用户监听
   */
  public addUserListener(): Observable<any> {
    if (!this._conversation) {
      return Observable.throw(new Error('会话不存在'))
    }

    return this.realtimeUtil.addUserListener(this._conversation)
  }
}
