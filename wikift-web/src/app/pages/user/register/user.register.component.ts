/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToastyService } from 'ng2-toasty';

import { UserParamModel } from '../../../shared/model/param/user.param.model';

import { UserService } from '../../../../services/user.service';
import { CodeConfig } from '../../../../config/code.config';
import { ResultUtils } from '../../../shared/utils/result.util';

@Component({
    selector: 'wikift-user-register',
    templateUrl: 'user.register.component.html'
})

export class UserRegisterComponent implements OnInit {

    form: FormGroup;
    user: UserParamModel;

    constructor(private router: Router,
        private userService: UserService,
        private toastyService: ToastyService) {
        this.form = new FormGroup({
            username: new FormControl('', CustomValidators.range([5, 9])),
            password: new FormControl('', CustomValidators.number)
        });
    }

    ngOnInit() {
        this.user = new UserParamModel();
    }

    register() {
        this.userService.register(this.user).subscribe(
            result => {
                if (result.code === CodeConfig.SUCCESS) {
                    this.toastyService.info('用户 ' + this.user.username + ' 注册成功!!!');
                    // 跳转到首页
                    this.router.navigate(['/user/login']);
                } else {
                    this.toastyService.error(ResultUtils.getError(result));
                }
            }
        );
    }

}
