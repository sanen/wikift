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
package com.wikift.server.controller;

import com.wikift.model.user.UserEntity;
import com.wikift.support.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @PreAuthorize("hasAuthority(('ADMIN_USER'))")
    Object list() {
        return userRepository.findAll();
    }

    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @PreAuthorize("hasAuthority(('STANDARD_USER'))")
    UserEntity info() {
        return userRepository.findByUsername("admin");
    }

}
