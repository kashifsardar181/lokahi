/*******************************************************************************
 * This file is part of OpenNMS(R).
 *
 * Copyright (C) 2014 The OpenNMS Group, Inc.
 * OpenNMS(R) is Copyright (C) 1999-2014 The OpenNMS Group, Inc.
 *
 * OpenNMS(R) is a registered trademark of The OpenNMS Group, Inc.
 *
 * OpenNMS(R) is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * OpenNMS(R) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with OpenNMS(R).  If not, see:
 *      http://www.gnu.org/licenses/
 *
 * For more information contact:
 *     OpenNMS(R) Licensing <license@opennms.org>
 *     http://www.opennms.org/
 *     http://www.opennms.com/
 *******************************************************************************/
package org.opennms.horizon.jmx.config;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class MBeanServer {
    private String ipAddress;
    private int port;
    private List<Parameter> parameters = new LinkedList<>();

    public String getIpAddress() {
        return ipAddress;
    }
    public int getPort() {
        return port;
    }
    public List<Parameter> getParameters() {
        return parameters;
    }
    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }
    public void setPort(int port) {
        this.port = port;
    }
    public void setParameters(List<Parameter> parameters) {
        this.parameters = parameters;
    }

    @JsonIgnore
    public Map<String, String> getParameterMap() {
        Map<String, String> parameterMap = new HashMap<>();
        for (Parameter parameter : getParameters()) {
            parameterMap.put(parameter.getKey(), parameter.getValue());
        }
        return parameterMap;
    }
}
